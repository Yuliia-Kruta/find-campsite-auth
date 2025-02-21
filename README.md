<h1 align="center">Find Campsite Auth</h1>
<br/>
<img align="left" src="./find-campsite-auth.gif" width="30%" height="auto"/>
<br/><br/><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Project Link: <a target="new" href="https://find-campsite-auth-website.onrender.com">Live Demo</a>
<br/><br/><br/><br/><br/>
<br/>
<h2>Project description</h2>
<b>Find Campsite Auth</b> is a robust authentication system designed for a campsite booking platform. It enables users to create accounts, log in, and reset passwords while ensuring data security. <br/>The backend is built with <b>Python</b> &amp; <b>Flask</b>, while the frontend is developed with <b>React</b>. Utilises <b>Redis</b> as a key-value database. 

<h2>Features</h2>
<ul>
  <li><b>User Registration:</b> Allows users to create an account with securely hashed passwords.</li>
  <li><b>Login & Authentication:</b> Uses JWT tokens to manage user sessions securely.</li>
  <li><b>Password Reset:</b> Enables users to reset their passwords by answering a security question.</li>
  <li><b>Protected Routes:</b> Restricts access to certain pages for authenticated users only.</li>
  <li><b>Efficient Data Storage:</b> Utilises Redis for fast and scalable user data retrieval.</li>
</ul>

<h2>Technologies Used</h2>
<a href="https://www.python.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="python" width="40" height="40"/> </a>&nbsp;
<a href="https://flask.palletsprojects.com/" target="_blank" rel="noreferrer"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original-wordmark.svg" alt="flask" width="40" height="40"/> </a>&nbsp;
<a href="https://redis.io" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original-wordmark.svg" alt="redis" width="40" height="40"/> </a>&nbsp;
bcrypt&nbsp;
JWT&nbsp;
<a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a>&nbsp;
<a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a>&nbsp;
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a>&nbsp;
Axios

<h2>API Endpoints</h2>
<table>
  <thead>
    <tr>
      <th>Endpoint</th>
      <th>Method</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>/register</code></td>
      <td>POST</td>
      <td>Registers a new user</td>
    </tr>
    <tr/></tr>
    <tr>
      <td><code>/login</code></td>
      <td>POST</td>
      <td>Authenticates user and returns JWT</td>
    </tr>
    <tr/></tr>
    <tr>
      <td><code>/verify_email</code></td>
      <td>POST</td>
      <td>Checks if email exists and returns security question</td>
    </tr>
    <tr></tr>
    <tr>
      <td><code>/forgot_password</code></td>
      <td>POST</td>
      <td>Resets password after security question verification</td>
    </tr>
    <tr></tr>
    <tr>
      <td><code>/home</code></td>
      <td>GET</td>
      <td>Protected route requiring JWT authentication</td>
    </tr>
  </tbody>
</table>

<h2>Database Schema</h2>

The application uses <b>Redis</b> as a key-value store for managing user authentication. Instead of a numeric user ID, each user is identified by their <b>email address</b>, which serves as the key. This approach simplifies lookups and eliminates the need for a separate indexing system.

<h4>Schema:</h4>
<b>Key:</b> user:{email}<br/>
<b>Value:</b> hash with fields: password, firstName, securityQuestion, securityAnswer

<h2>Getting Started</h2>
To get a local copy up and running, follow these simple steps.

<h3>Prerequisites</h3>
<h5>1. Make sure you have all the following installed:</h5>
- Python 3.x<br/>
- Node.js & npm<br/>
<h5>2. Setup Redis cache database</h5>

<h3>Installation</h3>
<h5>Clone the repository:</h5>
https://github.com/Yuliia-Kruta/find-campsite-auth.git

<h5>Navigate to the project directory:</h5>
<code>cd find-campsite-auth</code>

<h3>Backend Setup</h3>

<h5>Navigate to the project backend folder:</h5>
<code>cd backend</code>

<h5>Install the backend dependencies:</h5>
<code>pip install -r py_dependencies.txt</code>

<h5>Create a .env file in the backend directory and add your Redis connection details:</h5>
REDIS_HOST=<br/>
REDIS_PORT=<br/>
REDIS_PASSWORD=<br/>

<h5>Run the backend:</h5>
<code>python3 app.py</code>

<h3>Frontend Setup</h3>
<h5>Open a new terminal and navigate to the frontend directory:</h5>
<code>cd frontend</code>
<h5>Install the frontend dependencies:</h5>
<code>npm install</code>
<h5>Run the frontend:</h5>
<code>npm start</code>
<br/><br/>
The app will be available at http://localhost:3000.

<h2>Testing</h2>
Automated tests are implemented using <code>unittest</code>. To run tests:<br/>
<code>cd backend
 python3 -m unittest test_app.py
</code>

<h2>License</h2>
Distributed under the MIT License. See LICENSE for more information.
