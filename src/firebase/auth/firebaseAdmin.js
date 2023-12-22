// setCustomClaims.js
import admin from 'firebase-admin';
// import serviceAccount from '../auth/service.json'; // Replace with your admin SDK file

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      "type": "service_account",
      "project_id": "test-pp-njs",
      "private_key_id": "0bf5085460742adceef83a61a56345da7ec516c5",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQD1g5eYaeEQvBcu\n2sFeClTIenHcPL27AQSodAK2gwk9B0PIOenKwNyY58ROI/GplqAgMFEDbyEuE98f\nHS+dFqwk+XwB/PZtmqEg5BfAfa+4rhQVbnDOHA/sIvW/wblHh3BE8M5JBEgbYg6R\n0jAnN9g/+aMbuKi+xaeU5KFVEAXd8mzYcx7ejbFdgf3qe/5PCgyw9Xm5XnNPgrvG\neYP0MuepF5DCljA1B/JjWTjHDQeote7bOqB/u5la+wdV/s8MJkjYsH9je/XGYz46\nfFBvyYhauGYxxj8k5TQFb150NMhSX1LY4gpz2XXHKtYhUR3AQ04jyssfFnyyq0+h\nfyXVmrVXAgMBAAECggEAWQ7kBcCaiLSCAFgP/qnmuVZZSRerh1NGOkji1wvPZRjm\niJIhcY/mNX0VI3c8aVUfPq3oJUPBmHJS5Hl01RntVfg9+IanaXjG7CRxTT0KagaT\neHa4aruZNwIzfNyr9ft2STvEyI3KDkzSlijVmNRUGFjYxuyEIbeXI5aPw0htqGVb\nF4ILN1UgumnVzVgtZ7gIMnFkx/kUZMmhWOzy2UgzuzSboG6fiis6ebELD+dPfEwl\nUGm0fDD9ADseXrutbSk9x6KpIN0NeIvUK2dGL7Yuet1HwXP3QGspIrnDGsEY1jHi\n5/1E9jjtpi9C51zfGdm++cYJ6pSwsoIVnGx5OaXdqQKBgQD/CHZgrVAt6z4bGc5n\n9tESwyGee4s7tuLKzUp4PmQCd9Rupx0izmOpRfO8jyNhGDFejN6Kr/wJyzqfw7qD\nnX/lBhYEP5plnENsms1xqicHdsMsZY75IjNOZagrJJkWgO85UQ4tL+hlaIF7eHUD\nFUPy6YSCy262sAjcIp1s0c/CGwKBgQD2ceP3sTLqpWCU727lSiz7JsljElfhoe2z\nBuDN2nPxuPwo5Bv1dDksy2N5Ywle2bRkECDTv23LGSrYTD0T+eE1TdKm851aC9nL\nUll9tGl15/SjOXGp36ZTW0faj+IgB+AwKtbsUIJ7wJHjeknR0mlzHgzTNmQJV/z7\nFlyQIBztdQKBgQDgOXx6u2ZHORC9mw7ScTqYmF8yi8R6l+0GCUB0P8aGNPzc3KjN\nNVCCPzJwkhi1ASRG0OvIW7noknnUha2ykgMkRRmOWq1QsPbGwcPnL4ZpFY27tv7h\nI6SgRNh6Ng8yreGmLxGbwQc+QYe2Gs4mC8hWBeGvbVTF4jen8/cc+csECQKBgQCj\n7zDRFGulUOtFR1yCY+w2CSAPqiURb5DZ9SpXZQiZdA8w+ERs66oY1RbPqYSTNshb\ng6sCkCVt48jvZw9+GUupFKKa8hTq0FVJffcPupIon2rJpS2p7Z8Ldf3/MpUd738/\nK1AalJen0Hp7Ul6Gl6wTqpqnaVf0Kzaao85hBSuY/QKBgQCoEXrlVAlXa63sMcdW\nTSVJU/Du9s3A4syo3LazA+30MRmesTHH9O4q8rerqbYV8Yyjr9vr9OIWCvBSPnUw\njHondqMJlLVB3SZ2jb0hjxIwB2ilnx4ZcLailkAtOm29fe6Ib9DedGVuPSqGx6E/\n9BdB7a762YV6+yX75SPSeqTIrA==\n-----END PRIVATE KEY-----\n",
      "client_email": "firebase-adminsdk-o1qzl@test-pp-njs.iam.gserviceaccount.com",
      "client_id": "100004932496035423048",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-o1qzl%40test-pp-njs.iam.gserviceaccount.com",
      "universe_domain": "googleapis.com"
    }),
  });
}

// Function to set custom claims by email
export default async function setCustomClaimByEmail(email) {
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    const { uid } = userRecord;

    // Set custom claim
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    return { success: true, message: 'Custom claim set successfully' };
  } catch (error) {
    return { success: false, error: 'Failed to set custom claim' };
  }
}