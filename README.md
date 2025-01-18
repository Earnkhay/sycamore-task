# Frontend Engineer Assessment

This project demonstrates a customer entry dashboard built with **Vue.js**, **TailwindCSS**, and **Pinia**. The task is to create a form for managing customer data, implementing CRUD functionality, and ensuring the application is responsive, aesthetically pleasing, and user-friendly.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [How to Run](#how-to-run)
- [Technologies used](#technologies-used)

## Overview

The goal is to create a **Customer Dashboard** with the following features:

- **Customer Form**: A form with fields for First Name, Last Name, Email, Phone Number, State, and Active status.
- **CRUD Operations**: Implement the ability to create, read, update, and delete customer records.
- **Search Functionality**: Enable searching by Email, Name (First or Last), Phone Number, State, and Active Status.
- **Data Validation**: Use custom validation to ensure data correctness.
- **Responsive Design**: Ensure the UI is fully responsive across all screen sizes.

## Features

- **Customer Form**:
  - Tag: Customer Form
  - Fields: First Name, Last Name, Email, Phone Number, State, Active Status, Customer Details (WYSIWYG editor)
  - Submit Button: Triggers saving of customer data
- **Form Validation**:
  - Custom validation plugin to ensure fields are correctly filled.
- **Pinia Store**:
  - Customer data is stored and managed using **Pinia**.
  - CRUD operations on customer data (create, read, update, delete).
- **Searchable Data**:
  - Customers can be searched by Email, Full Name, Phone Number, State, and Active Status.
- **Responsive Layout**:
  - TailwindCSS is used to make the UI responsive across all screen sizes.

The design is modern, clean, and responsive, ensuring a pleasant user experience across devices.

## How to Run

### Prerequisites

Ensure you have the following installed:

- **Node.js** (version >=14)
- **npm** (version >=7)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/customer-dashboard.git
cd customer-dashboard

npm install

npm run dev
```
## Technologies Used

- **Vue.js** for the frontend framework
- **Pinia** for state management
- **TailwindCSS**: for responsive design and styling.
- **WYSIWYG editor**: or the customer details field.
  
