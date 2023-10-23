const api = 'http://elliancamposcrudapi.somee.com/api'

const setCookie = (name, value) => {
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/`;
}

const getCookie = (name) => {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
};