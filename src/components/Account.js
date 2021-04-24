import React, { Component, useState } from 'react';
import {useAuth} from '../context/AuthContext'
import StringData from '../context/StringData';
import {Link} from 'react-router-dom'
import { Avatar, CircularProgress, Hidden, withStyles, createStyles, Button, TextField } from '@material-ui/core';
import AccountMobile from './AccountMobile';
import {storage, db} from './firebase';

const styles = theme => createStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url("bg.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100vh',
        overflowY: 'hidden'
    },
    back: {
       marginLeft: '150px'
    },
    profile: {
        [theme.breakpoints.down('sm')]: {
            width: '90%',
            marginTop: '20px',
            backgroundColor: 'transparent',
            boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.37)',
        },
        backgroundColor: 'white',
        padding: '20px 0px',
        margin: '10px auto',
        marginTop: '-50px',
        width: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '20px'
    },
    avatar: {
        [theme.breakpoints.down('sm')]: {
            width: '100px',
            height: '100px',
        },
        width: '150px',
        height: '150px',
        marginBottom: '20px',
        margin: '10px auto'
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
        position: 'absolute'
    }
});

class Account extends Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            documentKey: localStorage.getItem(StringData.FirebaseDocumentId),
            id: localStorage.getItem(StringData.ID),
            name: localStorage.getItem(StringData.FirstName),
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
            loading: true
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
        const {photoUrl, name, aboutMe, loading, message} = this.state;
        return (
            <>
            <Hidden smDown>
            <div className={classes.root} >

               <div className={classes.profile} >
                   <div style={{textAlign: 'center', margin: '10px auto', width: '70%'}} >
                       <div>
                        <Avatar src={photoUrl} alt='' className={classes.avatar} onClick={() => {this.refInput.click()}} />
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
                       {message && <p style={{color: 'green'}} >{message}</p>}
                   <TextField fullWidth variant='outlined' style={{padding: '10px', marginBottom: '20px'}} label='Username' type='text' name='name' value={name ? name : ''} onChange={this.handleInputChange} />
                   <TextField fullWidth variant='outlined' style={{padding: '10px', marginBottom: '20px'}} label='Tell us about yourself...' type='text' name='aboutMe' value={aboutMe ? aboutMe : ''} onChange={this.handleInputChange} />
                   <Button variant='contained' color='primary' style={{color: 'white', fontWeight: 'bold', fontFamily: 'Trebuchet MS'}} onClick={this.uploadImage} disabled={loading} >
                       Save
                       {loading && (
                           <CircularProgress className={classes.loading} />
                       )}
                    </Button>
                   </div>
               </div>
            </div>
            </Hidden>

            <AccountMobile />
            </>
        )
    }
}

export default withStyles(styles)(Account);