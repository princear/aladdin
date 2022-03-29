export function handleValidations(text, type) {
  if (type === 'name') {
    let regex = /^[a-zA-Z ]{2,30}$/;
    if (text === '') {
      return {
        value: text,
        status: false,
        errorText: '*Please enter name.',
      };
    } else if (!regex.test(text)) {
      return {
        status: false,
        value: text,
        errorText: '*Please enter valid name.',
      };
    } else if (text.length < 3) {
      return {
        value: text,
        status: false,
        errorText: '*Please enter valid name.',
      };
    } else {
      return {
        value: text,
        status: true,
        errorText: '',
      };
    }
  }
  if (type === 'firstName') {
    let regex = /^[a-zA-Z ]{2,30}$/;
    if (text === '') {
      return {
        value: text,
        status: false,
        errorText: '*Please enter first name.',
      };
    } else if (!regex.test(text)) {
      return {
        status: false,
        value: text,
        errorText: '*Please enter valid first name.',
      };
    } else if (text.length < 3) {
      return {
        value: text,
        status: false,
        errorText: '*Please enter valid first name.',
      };
    } else {
      return {
        value: text,
        status: true,
        errorText: '',
      };
    }
  }
  if (type === 'lastName') {
    let regex = /^[a-zA-Z ]{2,30}$/;
    if (text === '') {
      return {
        value: text,
        status: false,
        errorText: '*Please enter last name.',
      };
    } else if (!regex.test(text)) {
      return {
        status: false,
        value: text,
        errorText: '*Please enter valid last name.',
      };
    } else if (text.length < 3) {
      return {
        value: text,
        status: false,
        errorText: '*Please enter valid last name.',
      };
    } else {
      return {
        value: text,
        status: true,
        errorText: '',
      };
    }
  } else if (type === 'email') {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;
    if (text === '') {
      return {
        status: false,
        value: text,
        errorText: '*Please enter email.',
      };
    } else if (!emailRegex.test(text)) {
      return {
        status: false,
        value: text,
        errorText: '*Please enter valid email.',
      };
    } else {
      return {
        value: text,
        status: true,
        errorText: '',
      };
    }
  } else if (type === 'mobNo') {
    let mobileRegex = /[6789]\d{9}$/i;
    if (text === '') {
      return {
        value: text,
        status: false,
        errorText: '*Please enter mobile numbar.',
      };
    } else if (!mobileRegex.test(text)) {
      return {
        value: text,
        status: false,
        errorText: '*Please enter valid mobile numbar.',
      };
    } else {
      return {
        value: text,
        status: true,
        errorText: '',
      };
    }
  } else if (type === 'otp') {
    let regx = /^[a-zA-Z0-9\s,'-]*$/;
    if (text === '') {
      return {
        value: text,
        status: false,
        errorText: '*Please enter otp.',
      };
    } else if (text.length !== 6) {
      return {
        status: false,
        value: text,
        errorText: '*Please enter valid otp.',
      };
    } else {
      return {
        value: text,
        status: true,
        errorText: '',
      };
    }
  } else if (type === 'password') {
    if (text === '') {
      return {
        value: text,
        status: false,
        errorText: '*Please enter password.',
      };
    } else if (text.length < 6) {
      return {
        value: text,
        status: false,
        errorText: '*Minimum password length must be 6.',
      };
    } else {
      return {
        value: text,
        status: true,
        errorText: '',
      };
    }
  } else if (type === 'houseNo') {
    let houseNoRegx = /[A-Za-z0-9'\.\-\s\,]/;
    if (text === '') {
      return {
        status: false,
        value: text,
        errorText: '*Please enter house/flat/office nunber.',
      };
    } else if (!houseNoRegx.test(text)) {
      return {
        status: false,
        value: text,
        errorText: '*Please enter valid house/flat/office nunber.',
      };
    } else {
      return {
        value: text,
        status: true,
        errorText: '',
      };
    }
  } else if (type === 'areaName') {
    let areaNameRegx = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
    if (text === '') {
      return {
        status: false,
        value: text,
        errorText: '*Please enter area name.',
      };
    } else if (!areaNameRegx.test(text)) {
      return {
        status: false,
        value: text,
        errorText: '*Please enter valid area name.',
      };
    } else {
      return {
        value: text,
        status: true,
        errorText: '',
      };
    }
  } else if (type === 'landmark') {
    let landmarkRegx = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
    if (text === '') {
      return {
        status: false,
        value: text,
        errorText: '*Please enter landmark.',
      };
    } else if (!landmarkRegx.test(text)) {
      return {
        status: false,
        value: text,
        errorText: '*Please enter valid landmark.',
      };
    } else {
      return {
        value: text,
        status: true,
        errorText: '',
      };
    }
  } else if (type === 'pincode') {
    let pincodeRegx = /^(\d{4}|\d{6})$/;
    if (text === '') {
      return {
        status: false,
        value: text,
        errorText: '*Please enter pincode.',
      };
    } else if (!pincodeRegx.test(text)) {
      return {
        status: false,
        value: text,
        errorText: '*Please enter valid pincode.',
      };
    } else {
      return {
        value: text,
        status: true,
        errorText: '',
      };
    }
  }

}
