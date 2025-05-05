const elForm = document.querySelector(".js-form");

const register = async (data) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        body: data,
    });
    return res.json();
}

elForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const res = await register(formData);
    if (res.status != 201) return alert(res.message);
    window.location.href = "/login";
});