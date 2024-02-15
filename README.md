# Pictoversity - App and platform for educational comics
[Donations](https://www.paypal.com/donate/?business=PDMTEA6K5786Y&no_recurring=0&item_name=Thanks+for+supporting+Pictoversity%21+We+appreciate+you%21&currency_code=USD) are appreciated! 

Pictoveristy is under development and a demo version is deployed on Azure: 
[https://wonderful-coast-0efcca010.4.azurestaticapps.net/](https://wonderful-coast-0efcca010.4.azurestaticapps.net/)

It is designed for mobile (see info about [Progressive Web Apps](https://support.google.com/chrome/answer/9658361?hl=en&co=GENIE.Platform%3DAndroid#)), which means it behaves much like a native app when you install it using the "Save to Home Screen" option. 

Created and designed by Yumie Lee.
Web App developed by Grant Lee.
Built with [React](https://reactjs.org/)

Copyright 2023 - Yumie Lee, Grant Lee
All rights reserved


Note:
For Dev DATABASE_CONNECTION_STRING use (change MYPASSWORD): 
export DATABASE_CONNECTION_STRING="Server=tcp:grantdb.database.windows.net,1433;Initial Catalog=grantdb01;Persist Security Info=False;User ID=CloudSA8e83c0b3;Password={MYPASSWORD};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"

To start the Azure SWA dev environment use:
swa start --data-api-location swa-db-connections

Install the SWA CLI using: 
npm install -g @azure/static-web-apps-cli

