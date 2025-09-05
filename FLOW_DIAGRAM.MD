# Mermaid - FLOW DIAGRAM

## Product Flow

flowchart TD

    %% USER JOURNEY START
    A[User visits site] --> B[Load Products & Categories from API]

    %% BROWSING DECISION
    B -->|Click on Category?| C{Category Selected?}
    C -->|Yes| D[Load Products in Category from API]
    C -->|No| E[Keep Browsing Products]

    %% PRODUCT SELECTION
    D --> F[Select Product → Get Product Details from API]
    E --> F

    %% CART FLOW
    F -->|Add to Cart| G[Cart API → Update Cart Collection]
    G --> H[User Views Cart Page]
    H -->|Update/Remove Items| G

    %% CHECKOUT FLOW
    H -->|Proceed to Checkout| I[Checkout]

    %% AUTHENTICATION CHECK
    I --> J{User Logged In?}
    J -->|No| J1[Login / Signup Page]
    J1 --> J2[Authenticate via Firebase]
    J2 --> J[User Logged In?]
    J -->|Yes| K[Address & Billing]

    %% ORDER & PAYMENT
    K --> L[Place Order]
    L --> |Payment Successful| M[Create Order Document in Orders Collection]
    L --> |Payment Failed| H[Return to Cart Page]

    %% POST-PURCHASE
    M --> N[Show Order Confirmation Page]


## User Flow

flowchart TD

    %% LOGIN & SIGNUP FLOW
    A[Login Page] --> |clicks signup| B[Signup Page]
    B[Signup Page] --> F[Enter Signup Details]
    A[Login Page] --> C[Login Details]
    C --> D[Send to Firebase Authentication]
    D --> |Login Successful| E[Login User]
    D --> |User Not Found| B[Signup Page] 
    F --> G[SignUp with Firebase Authentication]
    G -->|Signup Success| H[Save User Profile to DB]
    G -->|Signup Failed| B
    G -->|User Already exists| A
    H --> I[Auto Login User]
    I --> J[Store User Info in Redux Store]
    E --> J[Store User Info in Redux Store]
