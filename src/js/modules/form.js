export default class Form {
    constructor(form){
        this.forms = document.querySelectorAll(form);
        this.message = {
            loading: "Loading...",
            success: "Thanks. We call you in near future.",
            failure: "Something went wrong"
        };
        this.path = 'assets/question.php';
    }


    async postData(url, data){
        let res =await fetch(url, {
            method: "POST",
            body: data
        });
        return await res.text();
    }

    init(){
        this.forms.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();
                let statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                margin-top: 15px;
                font-size: 18px;
                color: grey;
                `;
                item.parentNode.appendChild(statusMessage);

                statusMessage.textContent = this.message.loading;

                const formData = new FormData(item);

                this.postData(this.path, formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = this.message.success;
                })
                .catch(()=> {
                    statusMessage.textContent = this.message.failure;
                });
            });
        });
    }
}