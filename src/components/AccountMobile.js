import React, { Component, useState } from 'react';
import {useAuth} from '../context/AuthContext'
import StringData from '../context/StringData';
import {Link} from 'react-router-dom'
import { Avatar, CircularProgress, Hidden, withStyles, createStyles, Button, TextField } from '@material-ui/core';
import {storage, db} from './firebase';
import Chart from './Chart';
import Header from './Header';
import CreateIcon from '@material-ui/icons/Create';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const styles = theme => createStyles({
    root: {
        backgroundColor: 'white',
        overflowX: 'none'
    },
    back: {
       marginLeft: '150px'
    },
    profile: {
        backgroundColor: 'transparent',
        padding: '70px 0px',
        margin: '0px auto',
        marginTop: '0px',
        // width: '400px',
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        borderTopLeftRadius: '20px',
        borderBottomLeftRadius: '20px',
        height: '100%'
    },
    avatar: {
        width: '80px',
        height: '80px',
        marginBottom: '20px',
        margin: '10px auto',
        marginTop: '-20px'
    },
    input: {
        position: 'absolute',
        width: '40px',
        height: '40px',
        left: '0px',
        outline: '0',
        zIndex: '-1',
        opacity: 1
    },
    loading: {
        // position: 'absolute'
    },
    profileBody: {
        backgroundColor: 'transparent',
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        marginTop: '0px',
        padding: '0px 0px',
        borderRadius: '20px',
        margin: '10px auto',
    }
});


class AccountMobile extends Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            documentKey: localStorage.getItem(StringData.FirebaseDocumentId),
            id: localStorage.getItem(StringData.ID),
            name: localStorage.getItem(StringData.FirstName),
            lastName: localStorage.getItem(StringData.LastName),
            aboutMe: localStorage.getItem(StringData.Description),
            photoUrl: localStorage.getItem(StringData.PhotoURL),
            message: ''
        }
        this.newPhoto = null
        this.newPhotoUrl = ''
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.updateUserInfo = this.updateUserInfo.bind(this);
    }

    componentDidMount() {
        if(!localStorage.getItem(StringData.ID)) {
            this.props.history.push('/')
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleImageChange = (e) => {
        if(e.target.files && e.target.files[0]) {
            const prefixFileType = e.target.files[0].type.toString();
            if(prefixFileType.indexOf(StringData.PREFIX_IMAGE) !== 0 ) {
                return
            }
            this.newPhoto = e.target.files[0];
            this.setState({
                photoUrl: URL.createObjectURL(e.target.files[0])  
            })
        }else{
            return
        }
    }
    
    uploadImage = () => {
        this.setState({
            loading: true,
            message: ''
        })
        if(this.newPhoto){
            const uploadTask = storage.ref().child(this.state.id).put(this.newPhoto);
            uploadTask.on(StringData.UPLOAD_CHANGED, null, err => {
                this.setState({loading: false})
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                    this.updateUserInfo(true, downloadURL)
                })
            }
            )
        }else{
            this.updateUserInfo(false, null)
        }
    }

    updateUserInfo = (updatedPhotoURL, downloadURL) => {
        let newinfo
        if(updatedPhotoURL) {
            newinfo = {
                name: this.state.name,
                description: this.state.aboutMe,
                URL: downloadURL
            }
        }else {
            newinfo = {
                name: this.state.name,
                description: this.state.aboutMe,
            }
        }
        db.collection('users').doc(this.state.documentKey).update(newinfo).then(data => {
            localStorage.setItem(StringData.Name, this.state.name);
            localStorage.setItem(StringData.Description, this.state.aboutMe);
            if(updatedPhotoURL) {
                localStorage.setItem(StringData.PhotoURL, downloadURL)
            }
            this.setState({
                loading: false
            })
            this.setState({
                message: 'Your Profile has been updated successfully!'
            })
        })
    }

    render() {
        const {classes} = this.props;
        const {photoUrl, name, aboutMe, loading, message, lastName} = this.state;
        return (
            <>
            <Hidden mdUp>
            <div className={classes.root} >
            <header style={{ height: '40px', display: 'flex', alignItems: 'center', padding: '10px 20px', color: '#F6CD2D'}} >
                    <Link to='/' style={{textDecoration: 'none', color: '#013972', display: 'flex', alignItems: 'center',}} >
                    <ArrowBackIosIcon style={{fontSize: '15px'}} />
                    <h5 style={{marginTop: '10px', fontSize: '15px'}} >Back Home</h5>
                    </Link>
                </header>
                
                <div style={{width: '100%', height: '2px', backgroundColor: '#013972',}}></div>
                {message && <p style={{color: '#013972'}} >{message}</p>}
            <div className={classes.profileBody} >
            
               <div className={classes.profile} >
                   <div style={{textAlign: 'center', margin: '0px auto', width: '100%' }} >
                       <div style={{display: 'flex', alignItems: 'center', marginTop: '20px'}} >
                        <div style={{display: 'flex', alignItems: 'center', marginTop: '-40px', marginLeft: '10px'}} >
                            <Avatar src={photoUrl} alt='' className={classes.avatar} />
                            <div style={{marginLeft: '10px'}} >
                                <h5 style={{fontWeight: 'bold', marginTop: '-20px', fontSize: '11px'}} >Change Picture</h5>
                                <p style={{fontSize: '10px'}} >Max file size is 20mb</p>
                            </div>
                        </div>
                        <div style={{marginTop: '-80px', marginLeft: '50px'}} >
                            <button onClick={() => {this.refInput.click()}} style={{border: '1px solid #ccc', padding: '2px 10px', borderRadius: '5px', fontWeight: 'bold'}} >Upload</button>
                            <input 
                            ref = {el => {
                                this.refInput = el
                            }}
                            accept = 'image/*'
                            type ='file'
                            className={classes.input}
                            onChange={this.handleImageChange}
                            />
                        </div>
                       </div>
                       <div style={{display: 'flex', alignItems: 'center', marginTop: '50px'}} >
                        <div style={{display: 'flex', alignItems: 'center', marginTop: '-40px', marginLeft: '10px'}} >
                            <div style={{textAlign: 'left'}} >
                                <h6 style={{fontWeight: 'bold'}} >Change Password</h6>
                                <p style={{fontSize: '8px'}} >Reset password for security purposes.</p>
                            </div>
                        </div>
                        <div style={{marginTop: '-80px', marginLeft: '30px'}} >
                            <Link to='/forgotPassword' >
                                <button style={{border: '1px solid #ccc', padding: '2px 10px', borderRadius: '5px', fontWeight: 'bold'}} >Reset Password</button>
                            </Link>
                            <input 
                            ref = {el => {
                                this.refInput = el
                            }}
                            accept = 'image/*'
                            type ='file'
                            className={classes.input}
                            onChange={this.handleImageChange}
                            />
                        </div>
                       </div>

                       <div style={{marginTop: '20px'}} >
                           <div><h3 style={{fontWeight: 'bold'}} >My Profile</h3></div>
                        
                        <TextField fullWidth variant='outlined' style={{padding: '10px', marginBottom: '20px',}} label='Username' type='text' name='name' value={name ? name : ''} onChange={this.handleInputChange} />
                        <TextField fullWidth variant='outlined' style={{padding: '10px', marginBottom: '20px'}} label='Full Name' type='text' name='name' value={name ? name +' '+ lastName : ''} onChange={this.handleInputChange} />
                        <TextField fullWidth multiline rows={4} variant='outlined' style={{padding: '10px', marginBottom: '20px'}} label='Tell us about yourself...' type='text' name='aboutMe' value={aboutMe ? aboutMe : ''} onChange={this.handleInputChange} />
                        {loading ?
                            <Button variant='contained' style={{color: 'white', fontWeight: 'bold', fontFamily: 'Montserrat', backgroundColor: '#002447'}} >
                                <CircularProgress className={classes.loading} />
                            </Button>
                            :
                            <Button variant='contained' style={{color: 'white', fontWeight: 'bold', fontFamily: 'Montserrat', backgroundColor: '#002447'}} onClick={this.uploadImage}>
                            Save
                            </Button>    
                        }
                       </div>
                    
                   </div>
               </div>

                </div>
            </div>
            </Hidden>
            </>
        )
    }
}

export default withStyles(styles)(AccountMobile);
