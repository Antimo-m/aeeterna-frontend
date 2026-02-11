import { useState } from "react"
import style from "../styles/SendContacts.module.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backupForm = {
    name: "",
    surname: "",
    email: "",
    description: "",
}

export default function SendContacts() {
    const [formData, setFormData] = useState(backupForm);
    const [errorMessage, setErrorMessage] = useState({
        type: "",
        message: ""
    })
    const backEndUrl = import.meta.env.VITE_BACKEND_URL;
    const navigation = useNavigate();

    function handleFormData(e) {
        const { name, value } = e.target

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

    }

    function sendFormData(e) {
        e.preventDefault();

        if (formData.name.length < 2 || formData.surname.length < 2) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return setErrorMessage({
                type: "error",
                message: "Nome e cognome devono contenere almeno 2 caratteri"
            })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim())) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return setErrorMessage({
                type: "error",
                message: "La mail inserita non è valida"
            })
        }

        if (formData.description.length < 10) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return setErrorMessage({
                type: "error",
                message: "Aggiungi una descrizione esaustiva"
            })
        }

        axios.post(`${backEndUrl}/api/sendcontacts`, formData).then((resp) => {
            setFormData(backupForm)
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            setErrorMessage({
                type: "correct",
                message: "Richiesta inviata con successo"
            });

            setTimeout(() => {
                navigation("/");
            }, 2000);

        }).catch((err) => {
            console.log(err);
        })
    }

    return <>
        <main className={style.main}>
            <div className={style.container}>
                {errorMessage.type !== "" &&
                    <div className={errorMessage.type === "error" ? style.errorMessage : style.correctMessage}>
                        {errorMessage.message}
                        <i onClick={() => setErrorMessage({ type: "", message: "" })} className="bi bi-x-lg"></i>
                    </div>
                }
                <div className={style.card}>
                    <h1 className={style.title}>Contattaci</h1>
                    <p className={style.subtitle}>
                        Compila il modulo e ti risponderemo il prima possibile.
                    </p>
                    <form action="" onSubmit={sendFormData} className={style.form}>
                        <div className={style.inputGroup}>
                            <label htmlFor="name">Nome</label>
                            <input required placeholder="Mario..." type="text" name="name" value={formData.name} onChange={(e) => handleFormData(e)} />
                        </div>
                        <div className={style.inputGroup}>
                            <label htmlFor="surname">Cognome</label>
                            <input required placeholder="Rossi..." type="text" name="surname" value={formData.surname} onChange={(e) => handleFormData(e)} />
                        </div>
                        <div className={style.inputGroup}>
                            <label htmlFor="email">Email</label>
                            <input required placeholder="mariorossi@gmail.com" type="email" name="email" value={formData.email} onChange={(e) => handleFormData(e)} />
                        </div>
                        <div className={style.inputGroup}>
                            <label htmlFor="description">Descrizione problema</label>
                            <textarea required placeholder="Descrizione..." name="description" value={formData.description} onChange={(e) => handleFormData(e)} />
                        </div>
                        <div className={style.buttonWrapper}>
                            <button type="submint" className={style.submitButton}>INVIA</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    </>
}