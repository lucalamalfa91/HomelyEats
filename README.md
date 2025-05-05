# HomelyEats

> A “home-cooked” food-delivery marketplace built on Azure’s free tier.  
> Connect home chefs with local food lovers—secure, scalable, and cost-effective.

---

## 🧩 Project Structure

```plaintext
HomelyEats/
├── infra/                    # Terraform code to provision Azure resources
│   ├── main.tf
│   ├── variables.tf
│   └── terraform.tfvars.example
│
├── functions/                # Azure Functions (Node.js)
│   ├── shared/               # Shared helper (Cosmos DB client)
│   │   └── cosmosClient.js
│   ├── createOrder/          # HTTP-trigger to create a new order
│   │   └── index.js
│   ├── createCheckout/       # HTTP-trigger to create a Stripe Checkout Session
│   │   └── index.js
│   └── seedData/             # HTTP-trigger to insert demo seed data
│       └── index.js
│
├── mobile/                   # React Native (Expo) client app
│   ├── App.js
│   ├── app.json
│   └── package.json
│
├── shared/                   # (Optional) Common code or types
│   └── …
│
├── .github/
│   └── workflows/
│       ├── deploy-functions.yml   # CI/CD for Azure Functions
│       └── deploy-mobile.yml      # CI/CD for Expo mobile build
│
├── .gitignore
└── README.md
```

---

## 🚀 Features

- **User registration & authentication** via Azure AD B2C  
- **Order management** (create, list) stored in Cosmos DB (Mongo API)  
- **Serverless API** using Azure Functions  
- **Stripe Checkout** for secure payments  
- **Push notifications** via Azure Notification Hubs + FCM/APNS  
- **CI/CD** pipelines:  
  - Azure Functions deploy on every `/functions/**` push  
  - Expo Android builds on every `/mobile/**` push  

---

## ⚙️ Prerequisites

1. **Azure CLI** → `az login`  
2. **Terraform** → v1.4+  
3. **Node.js** → v18 LTS  
4. **Expo CLI** → `npm install -g expo-cli`  
5. **Stripe account** → API keys  
6. **GitHub account** with repo access  

---

## 🔧 1. Provision Azure Infrastructure

```bash
cd infra
terraform init
terraform apply
```

- **Resource Group**: `foodapp-rg`  
- **Cosmos DB** (free-tier, Mongo API)  
- **Storage Account** for Functions  
- **Function App** (`foodapp-api`)

> Fill in `terraform.tfvars` from the example file before running.

---

## 🔧 2. Deploy Azure Functions

```bash
cd functions
npm install
az login
az functionapp publish foodapp-api
```

- Functions:
  - `POST /api/createOrder`
  - `POST /api/createCheckout`
  - `GET  /api/seedData`

---

## 🔧 3. Configure GitHub Secrets

In your **HomelyEats** repo → **Settings > Secrets**:

- `AZURE_FUNCTIONAPP_PUBLISH_PROFILE`  
- `STRIPE_SECRET`  
- `EXPO_TOKEN`  

---

## 🔧 4. Link Frontend (Expo)

Edit `mobile/App.js`:

```js
const API_BASE = "https://<your-function-app>.azurewebsites.net/api";

await axios.post(`${API_BASE}/createOrder`, { title, price, vendorId });
```

---

## 🔧 5. Run & Test Mobile App

```bash
cd mobile
npm install
expo start
```

Scan the QR or launch on simulator/device.

---

## 🔄 CI/CD Workflows

- **Functions**  
  - `.github/workflows/deploy-functions.yml`  
  - Triggers on pushes to `functions/**`
- **Mobile App**  
  - `.github/workflows/deploy-mobile.yml`  
  - Triggers on pushes to `mobile/**`

Each workflow checks out the code, installs dependencies, and deploys automatically.

---

## 🗂️ Environment Variables

| Name                              | Description                           |
|-----------------------------------|---------------------------------------|
| `COSMOS_CONNECTION`               | Cosmos DB connection string           |
| `STRIPE_SECRET`                   | Stripe Secret Key                     |
| `AZURE_FUNCTIONAPP_PUBLISH_PROFILE` | Azure publish profile for Functions |
| `EXPO_TOKEN`                      | Expo access token for CI builds       |

---

## 📈 Next Steps

- Add **Authentication** flows (login, signup) with AD B2C  
- Implement **reviews & ratings** logic  
- Integrate **Notification Hub** pushes on order events  
- Extend **seedData** script with more realistic demo records  
- Add **unit/integration tests** for functions  
- Enhance **documentation** & code comments

---

_Enjoy building your home-cooked food marketplace!_
