npm install -g typescript ts-node ts-node-dev
tsc --init
update tsconfig.json (allowjavascript, rootDir)

npm init --y
npm install express
npm install -D @types/express 
npm install dotenv
npm install -D @types/dotenv 
npm install ms
npm install -D @types/ms 
npm install winston
npm install -D winston

npm i -D @types/node

npm install -D typescript

npm install dotenv-cli --save-dev
npm install ts-node-dev --save-dev
npm install http cookie-parser compression cors mongoose router
npm install @types/cookie-parser @types/compression @types/cors @types/mongoose @types/router --save-dev
npm install mongoose
npm install helmet
npm install @types/helmet --save-dev
npm install express-rate-limit
npm install @types/express-rate-limit --save-dev
npm install compression
npm install nodemon --save-dev



"dev": "ts-node-dev src/server.ts",

npm install bcrypt
npm install @types/bcrypt --save-dev

npm install express-validator
npm install @types/express-validator --save-dev

npm install jsonwebtoken
npm install @types/jsonwebtoken --save-dev
npm install morgan
npm i --save-dev @types/morgan
npm install tsconfig-paths --save-dev


{
    "email": "noraiwt@gmail.com",
    "password": "123542454"
}

  "dev": "ts-node-dev --respawn --transpileOnly --watch src --ignore-watch node_modules src/server.ts"



  // body("role")
  //   .optional()
  //   .isString()
  //   .withMessage("Role must be string.")
  //   .isIn(["user"])
  //   .withMessage("Role must be user."),