import React, { useContext, useEffect, useState } from "react";
import { removeInvalidToken } from "../4_utils/tokenChecker";
import { ReloadContext } from "./ReloadComponent";

const PostMakerComponent = () => {
    const [textContent, setTextContent] = useState("");
    const [imageContent, setImageContent] = useState("");
    const [imageContentAlt, setImageContentAlt] = useState("");
    const [submissionEmpty, setSubmission] = useState(false);
    const [{ imagePreviewSrc, imagePreviewAlt }, setImagePreview] = useState({ imagePreviewSrc: "", imagePreviewAlt: "" });
    const reload = useContext(ReloadContext);


    useEffect(() => {
        setTextContent("");
        setImageContent("");
        setImageContentAlt("");
        document.getElementById("textContent").value = "";
    }, [reload.homePage])


    const createPost = (e) => {
        e.preventDefault();

        if (textContent !== "" || imageContent !== "") {
            setSubmission(false);
            
            const dataForm = new FormData();
            dataForm.append("textContent", textContent);
            dataForm.append("imageContent", imageContent);
            dataForm.append("imageContentAlt", imageContentAlt);

            const authorizationHeader = new Headers(
                {
                    Authorization: "Bearer " + localStorage.getItem("groupomania_token")
                });

            fetch("http://localhost:3050/api/v1/submission/",
                {
                    method: "POST",
                    headers: authorizationHeader,
                    body: dataForm,
                })
                .then((response) => {
                    if (response.ok) {
                        alert("Le post a été crée avec succès!");
                    }
                    else {
                        alert("Votre session a expirée. Vous allez être redirigé vers la page de connexion");
                        removeInvalidToken();
                        window.location.href = "../login";
                    }
                })
                .catch(() => {
                    alert("Une erreur interne est survenue. Vous allez être redirigé vers la page de connexion");
                    removeInvalidToken();
                    window.location.href = "../login";
                });
            reload.setHomePage(true);
        }
        else {
            setSubmission(true);
        }
    }

    const handleImagePreview = (e) => {
        if (e?.target.files[0]) {
            setImagePreview
                (
                    {
                        imagePreviewSrc: URL.createObjectURL(e.target.files[0]),
                        imagePreviewAlt: e.target.files[0].name
                    }
                );
        }
        else {
            setImagePreview
                (
                    {
                        imagePreviewSrc: "",
                        imagePreviewAlt: ""
                    }
                );
        }
    }

    return (
        <React.StrictMode>
            <div className="post_maker">
                <h1 className="post_maker__title">Créer un post</h1>
                <p className="post_maker__description">Du simple texte ou bien une image ou les deux!</p>
                <form onSubmit={createPost} className="post_maker__box_submit">
                    <div className="post_maker__box_submit__field">
                        <label className="post_maker__box_submit__field__title" htmlFor="textContent">Texte</label>
                        <textarea
                            className="post_maker__box_submit__field__input"
                            type="text"
                            id="textContent"
                            name="textContent"
                            onChange={(e) => {
                                setTextContent(e.target.value);
                                if (textContent !== "") { setSubmission(false) };
                            }}>
                        </textarea>
                    </div>
                    <div className="post_maker__box_submit__field">
                        <div className="post_maker__box_submit__field__title post_maker__box_submit__field__title--image">
                            <label
                                className="post_maker__box_submit__field__title--image__button other_button"
                                htmlFor="imageContent">{(imageContent !== "") ? "Changer d'image" : "Ajouter une image"}
                            </label>
                            {imageContent !== "" ?
                                <div
                                    className="post_maker__box_submit__field__title--image__button other_button"
                                    onClick={() => {
                                        setImageContent("");
                                        handleImagePreview();
                                    }}>Supprimer l'image
                                </div> : null}
                        </div>
                        <input
                            type="file"
                            id="imageContent"
                            name="imageContent"
                            accept="image/*"
                            hidden
                            onChange={(e) => {
                                setImageContent(e.target.files[0]);
                                handleImagePreview(e);
                                setSubmission(false);
                            }}>
                        </input>
                        {imageContent !== "" ?
                            <img
                                className="post_maker__box_submit__field__image_preview"
                                src={imagePreviewSrc}
                                alt={imagePreviewAlt}
                            /> : null}
                    </div>
                    {imageContent !== "" ?
                        <div className="post_maker__box_submit__field">
                            <label className="post_maker__box_submit__field__title" htmlFor="imageContentAlt">Texte alternatif pour l'image</label>
                            <input
                                className="post_maker__box_submit__field__input post_maker__box_submit__field__input--imagealt"
                                type="text"
                                id="imageContentAlt"
                                name="imageContentAlt"
                                onChange={(e) => setImageContentAlt(e.target.value)}>
                            </input>
                        </div> : null
                    }
                    {(submissionEmpty === true) ?
                        <p className="post_maker__box_submit__field post_maker__box_submit__field--error">Impossible de créer un post vide</p> : null}
                    <button className="post_maker__box_submit__button submit_button" type="submit">Créer un post</button>
                </form>
            </div>
        </React.StrictMode>
    )
}

export default PostMakerComponent;