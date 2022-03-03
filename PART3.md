## DEPLOYING TO PRODUCTION
This is what I would do if this were to be deployed to production

* First of all, since we are only dealing with functions here, I'd make the decision to deploy my functions to a _function as a service_ platform.

* Since we'd be getting our data from Firestore for the sake of homogeinity, for my _function as a service_ platform, I'd go with Firebase's **Cloud Functions.**

* Having settled on Firebase Cloud Functions, to write my actual functions, I'd install the **Firebase CLI** and Initialize Cloud functions in my project with the command `firebase init functions`.

* I will tie my function to `http` just so the function is triggered `onHTTPRequest`

* Having written my function, I'd upload it to the cloud with the Firebase CLI
