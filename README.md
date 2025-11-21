# COS498_HW3_PDF_Server

## Project Overview

This is an Express + Nginx proxy manager server that serves a front-facing website with PDF document management capabilities. It implements custom modules to handle routing, PDF discovery, and PDF validation. Additionally, it uses a site with a domain name and HTTPS support.

### Features

- Serves 3 PDF files that can be downlaoded by the user.
- Basic metadata is displayed pertaining to these files.
- A routing module (routes.js) manages all routing operations.
- A PDF discover module finds available PDFs and gathers the associated metadata.
- A PDF validation module ensures that the PDF file selected exists in the "pdfs" folder.
- PDF metadata is stored in a metadata.json file. Contains the PDFs filename, title, and description.
- Uses a domain name with SSL/TLS certificates to enable HTTPS.

### Technologies Used

- Node.js
- Express.js
- Handlebars (HBS)
- HTML / CSS / JavaScript
- Docker
- Nginx-proxy-manager

### Running the Project

- **Step 1 — Get a Domain**
You can purchase and configure a domain through a registrar like Squarespace. After buying it, you must update the domain’s nameservers to your hosting platform (DigitalOcean was used in this project) so you can manage DNS there. Then you add DNS records (A record for the root domain and a CNAME or A record for www) to point the domain to your server’s IP. Once DNS finishes propagating, your domain will load your server instead of the raw IP.

- **Step 2 - Setup Nginx Proxy Manager and Configure SSL Certificate**

Spin up the project (in root directory) to setup the Nginx proxy manager:
- docker compose up -d --build

Once the containers are running, navigate to http://localhost:5001 to view the admin dashboard. You will be prompted to create an account. Once completed, go to Certificates->Add Certificates->Let's Encrypt via HTTP, add relevant domain names into the pop-up form. Navigate to Hosts->Proxy Hosts->Add Proxy Host, add the domain names here and configure these values:
- scheme: http
- Forward Hostname/IP: your Node.js container name, not domain name
- Forward Port: The port for the project, currently it's defined as 3012
- Block Common Exploits: True
- Websockets Support: True

Now go to the SSL tab and select your domain from the SSL Certificate dropdown, and set Force SSL to True. Save.

- **Step 3 - View HTTPS Site"**
Now you should be able to naviagte to your domain name and see the application!



