import React, { Component } from 'react';
import Cookies from 'js-cookie'; // Make sure you have the js-cookie library installed.
import axios from 'axios';

class App extends Component {
    state = { message: '' };

    componentDidMount() {
      const csrfToken = Cookies.get('csrftoken'); // Get the CSRF token from the cookie.
        fetch('http://127.0.0.1:8000/api/hello/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken, // Include the CSRF token in the headers.
          }
        })
        .then(response => {
          // Handle successful login here
          if (response.ok) {
            response.text().then(text => {
              let data = JSON.parse(text);
              
              this.setState({ message: data.message })
            })
          }
        })
        .catch(error => {
          // Handle login error here
          console.log(error);
        });
            // .then(response => response.json())
            // .then(
            //   data => this.setState({ message: data.message })
            // );
    }

    render() {
        return (
            <div>
                <h1>{this.state.message}</h1>
            </div>
        );
    }
}

export default App;
