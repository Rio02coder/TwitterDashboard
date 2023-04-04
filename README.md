
# Tweetics

This is an application which uses ML to predict your chance of Flu from tweets.




## Backend Environment Variables

To run this project, you will need to add the following environment variables to your .env file. This .env file should reside in the root directory of the backend which is **TwitterDashboard/backend**

`TWITTER_API_KEY = "Z1G1fmD4L0xgOJU1UacgLQGyo"`

`TWITTER_API_KEY_SECRET="ytyna4MX7OUQIEPwLhUgeh7yFd6NE4xZL2dK1Dpw6AkFcIoPlx"`

`TWITTER_BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAAH3%2BlQEAAAAAwSIv6rfIBGdy6oWZWZNSi%2F%2FU7rU%3DZBOEY4zU6e3BwA682HPQomPc0szomtZgvjOk3fobOAhVt4BDyZ"`

`TWITTER_ACCESS_TOKEN = "534363332-Jw5jEDRbnIuX3O7lEwkvU4Y6edr9y5AScZFb2CcG"`

`TWITTER_ACCESS_TOKEN_SECRET = "1A8liP90SIuwUNltkvlUb1ENyw9hhsS84AdW4SozY3rc2"`

`TWITTER_P_API_KEY = "gL79vbCqOUKBA8HQOUNkuyZtV"`

`TWITTER_P_API_KEY_SECRET= "M9BAZmWSzFcRJVguZnqWAZWouRIv6XU8lO8jmiuSo92lDvn36d"`

`TWITTER_P_BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAAHTIjAEAAAAAHCAPfj2Id2rwJsri%2FMPJTcAo2Sk%3DtCVpGcuO77C8zainFcVuZ01c6BX6IDopZ2kZDJDH52FrnGCYVw"`

`TWITTER_P_ACCESS_TOKEN = "1134101331977707520-fJ4oo4y2bzDq9cVh3WlB8pncFHcGkd"`

`TWITTER_P_ACCESS_TOKEN_SECRET = "RA24waxEMAFI0YadKMRO25ZLTWQ7cGBPM4EMxEUysBECc"`
## Backend Installation

Here are the installation instructions for the backend

```bash
  cd TwitterDashboard
  cd backend
  pip install virtualenv
  python3 venv <virtualenvironment-name>
  source <virtualenvironment-name>/bin/activate
  pip install -r requirements.txt
  
```
## Backend Cache Server setup
To setup the cache server of the backend, we need to go outside the project directory and please follow the docs mentioned in https://redis.io/docs/getting-started/. Separate installation guide has been provided according to the operating system of the machine running this system. 


## Backend Database setup
```bash
  python3 manage.py showmigrations
  python3 manage.py makemigrations
  python3 manage.py migrate
```

## Running Backend Server
Before running the following instructions, we need to start the cache server
by:
```bash
  cd <folder-name-of-redis>
  cd src
  ./redis-server
```
and then in another terminal
```bash
  cd <folder-name-of-redis>
  cd src
  ./redis-cli
```
Once this is completed, we can execute the following commands for running the backend server in localhost
```bash
  python3 manage.py runserver
```

If we want to run the server on a specific ip address

we need to go to **TwitterDashboard/backend/Tweetics/settings.py** and add the ip address in allowed hosts.

Once this is done, we have to execute the following command

```bash
  python3 manage.py runserver <ip-address>:8000
```


## Running Backend Tests

To run tests, we need to be in the root directory of the Backend, which is
**TwitterDashboard/backend**, have the virtual environment activated and cache server turned on.

Once this is done, we need to run the following command
```bash
  python3 manage.py test
```


## Frontend Environment Variables
To run this project, you will need to add the following environment variables to your .env file. This .env file should reside in the root directory of the frontend which is TwitterDashboard/Tweetics

`BASEURL = "<The IP you want or Set to 127.0.0.1>"`
## Frontend Installation
To run the front end a setup of react native is required. To start with the installtion, we need to make sure we have tools like **npm**, **yarn**, **npx** installed.
 
 **npm** can be installed from https://docs.npmjs.com/cli/v7/configuring-npm/install depending on the OS running this project.

 **Yarn** can be installed by
 ```bash
   npm install --global yarn
  ```
 **Npx** can be installed from https://docs.npmjs.com/cli/v7/commands/npx depending on the OS running this project.

 **React Native**

 To start with the react native installation, we first need to do the environment setup. The environment setup has to be configured for ios and android invidually jointly with the OS the project is running on. Specifically, the configuration needs to be done for **React Native CLI Quickstart**.This can be done from https://reactnative.dev/docs/environment-setup?guide=native

 **Disclaimer**

 Running the ios version of this app is not available for Windows or Linux systems. It is only available in Mac.

**Running The Application**

Once the above steps are completed, we can run the react native application. We need to follow the following steps for running the **ios** version.

```bash
cd TwitterDashboard
cd Tweetics
yarn
cd ios
pod install
cd ..
yarn ios
```

To run the **android** version we need to follow the following

```bash
cd TwitterDashboard
cd Tweetics
yarn
yarn android
```

