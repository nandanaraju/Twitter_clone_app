# Twitter Clone DApp - README

## Overview

This project is a decentralized application (DApp) that serves as a Twitter clone, built with blockchain technology. The DApp allows users to post tweets (messages) that are stored on the blockchain, ensuring transparency, immutability, and security. The app includes token-based authentication for login, MetaMask wallet connection verification during signup, and features such as Like, Comment, and Retweet, which are also stored on the blockchain.

## Key Features
- **Post Tweets**: Users can write and post tweets that are stored on the blockchain.
- **Like, Comment, and Retweet**: All interactions such as likes, comments, and retweets are recorded on the blockchain.
- **Blockchain-based Storage**: Tweets and interactions are permanently stored on the Ethereum blockchain, providing decentralization and security.
- **Token-Based Authentication**: Secure login system using tokens for authentication.
- **MetaMask Integration**: User signup verifies the connection to a MetaMask wallet for secure account management.

## Tech Stack
- **Smart Contracts (Solidity)**: Smart contracts are developed and deployed using Hardhat to handle tweets, likes, comments, and retweets on the blockchain.
- **Hardhat**: A development environment to compile, deploy, and test Ethereum smart contracts.
- **Backend (Node.js & Express)**: Backend server for handling authentication, user sessions, and interacting with the smart contracts.
- **Frontend (React.js)**: A user-friendly interface built with React.js that interacts with the blockchain through MetaMask and the backend API.

## Project Structure

```
/hardhat       - Smart contracts and blockchain-related scripts.
/frontend      - React.js application for the client-side of the DApp.
/backend       - Node.js server for API and token-based authentication.
```

## Setup Instructions

### Prerequisites
- **Node.js**: Ensure you have Node.js installed on your machine.
- **MetaMask**: MetaMask wallet extension installed in your browser.
- **Hardhat**: Hardhat installed globally for smart contract development.

### Clone the Repository
```bash
git clone https://github.com/your-username/twitter-clone-dapp.git
cd twitter_clone_app
```

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Hardhat Setup (Smart Contracts)
1. Navigate to the hardhat folder:
   ```bash
   cd hardhat
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run a local Ethereum blockchain using Hardhat:
   ```bash
   npx hardhat node
   ```

4. Compile and deploy the smart contracts:
   ```bash
   npx hardhat compile
   npx hardhat run scripts/deploy.js --network localhost
   ```

### Connecting Frontend to Backend
Make sure both the frontend and backend are running on their respective ports, and the blockchain is running locally via Hardhat. The frontend will automatically interact with the backend and blockchain.

## Usage

1. **MetaMask Connection**: Open the frontend in your browser, and you'll be prompted to connect your MetaMask wallet.
2. **Signup/Login**: Once connected, you can sign up using your MetaMask wallet, and token-based authentication will secure your session.
3. **Tweeting**: Post messages that will be stored on the blockchain.
4. **Liking/Commenting/Retweeting**: Interact with other tweets, and all actions will be recorded on the blockchain.

## Scripts

- **Backend**: Start the server
  ```bash
  cd backend && npm start
  ```

- **Frontend**: Start the development server
  ```bash
  cd frontend && npm run dev
  ```

- **Hardhat**: Run local Ethereum blockchain
  ```bash
  cd hardhat && npx hardhat node
  ```

## 🎥 Demo Video


[![Watch the video](https://github.com/nandanaraju/Twitter_clone_app/blob/main/frontend/src/assets/images/Untitled%20design.png)](https://www.youtube.com/watch?v=qdYUUF4QCqA)

## Contributing

Feel free to fork this repository and submit pull requests. Contributions and improvements are always welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Enjoy building on the blockchain and exploring decentralized applications with this Twitter clone DApp!
