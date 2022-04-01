const getURLParams = url => {
    new Proxy(new URL(url), {
        get: (params, prop) => params.get(prop),
    });
};

const url = new URL('https://www.youtube.com/watch?v=YgZbWmfkB6Y');
console.log(new URL('https://www.youtube.com/watch?v=YgZbWmfkB6Y').searchParams.get("v"));
console.log(getURLParams('https://www.youtube.com/watch?v=YgZbWmfkB6Y'));