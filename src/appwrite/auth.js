import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";


 class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
             await this.login({email,password})
             await this.verifyEmail()
             
               
            }
            return userAccount
            
        } catch (error) {
            throw error;
        }
    }

    async verifyEmail() {
        try {
            // Send a verification email
            const response = await this.account.createVerification('http://localhost:5173/verify');
            
            // Handle successful verification request
            console.log('Verification email sent successfully:', response);
            
            // You can also add code here to notify the user, e.g., showing a message in the UI
            alert('A verification email has been sent to your email address. Please check your inbox.');

            return response
            
        } catch (error) {
            // Handle any errors that occur during the verification request
            console.error('Error sending verification email:', error);
            
            // Optionally, show an error message to the user
            alert('Failed to send verification email. Please try again later.');
       
            // Rethrow the error if you want to handle it further up the call stack
            throw error;
        }
    }

    async verifyAccount(location){
        try {
           
            const params = new URLSearchParams(location.search);
            const userId = params.get('userId');
            const secret = params.get('secret');
            
            const response = await this.account.updateVerification(userId,secret);
            alert("Verification done");
            return response;
        } catch (error) {
            throw error;
        }
    }
    

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService


