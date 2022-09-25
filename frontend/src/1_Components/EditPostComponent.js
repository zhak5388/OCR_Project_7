import React, { useEffect, useState } from "react";

const EditPostComponent = (props) => {
    const [textContent, setTextContent] = useState(props.post.textContent);
    const [imageContent, setImageContent] = useState(props.post.imageContent);
    const [imageContentAlt, setImageContentAlt] = useState(props.post.imageContentAlt);
    const [submissionEmpty, setSubmission] = useState(false);
    const [{ imagePreviewSrc, imagePreviewAlt }, setImagePreview] = useState({ imagePreviewSrc: props.post.imageContent, imagePreviewAlt: props.post.imageContentAlt });
    
    useEffect(()=>
    {

    },[imageContent])


    const modifyPost = (e) => {
        e.preventDefault();

        const dataForm = new FormData();
        dataForm.append("textContent", textContent);
        dataForm.append("imageContent", imageContent);
        dataForm.append("imageContentAlt", imageContentAlt);

        if (textContent !== "" || (imageContent !== "toBeRemoved" && imageContent !== "")) {
            const authorizationHeader = new Headers(
                {
                    Authorization: "Bearer " + localStorage.getItem("groupomania_token")
                });

            fetch(`http://localhost:3050/api/v1/submission/${props.post.id}`,
                {
                    method: "PUT",
                    headers: authorizationHeader,
                    body: dataForm,
                })
                .then((response) => {
                    if (response.ok) {
                        alert("Le post a été modifié avec succès!");
                        window.location.href = "../home";
                    }
                    else {
                        alert("Votre session a expirée. Vous allez être redirigé vers la page de connexion");
                    }
                })
                .catch(() => {
                    alert("Une erreur interne est survenue. Vous allez être redirigé vers la page de connexion");
                });
        }
        else
        {
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
                <h1 className="post_maker__title">Modifier la publication</h1>
                <p className="post_maker__description">Vous pouvez modifier votre publication ici!</p>
                <form onSubmit={modifyPost} className="post_maker__box_submit">
                    <div className="post_maker__box_submit__field">
                        <label className="post_maker__box_submit__field__title" htmlFor="textContent">Texte</label>
                        <textarea
                            className="post_maker__box_submit__field__input"
                            type="text"
                            id="textContent"
                            name="textContent"
                            defaultValue={textContent}
                            onChange={(e) => {
                                setTextContent(e.target.value);
                                if(textContent!=="")
                                {
                                    setSubmission(false);
                                }
                            }}>

                        </textarea>
                    </div>
                    <div className="post_maker__box_submit__field">
                        <div className="post_maker__box_submit__field__title post_maker__box_submit__field__title--image">
                            <label
                                className="post_maker__box_submit__field__title--image__button other_button"
                                htmlFor="imageContent">{(imageContent === "" || imageContent === "toBeRemoved") ? "Ajouter une image" : "Changer d'image"}
                            </label>
                            {(imageContent === "" || imageContent === "toBeRemoved") ? null :
                                <div
                                    className="post_maker__box_submit__field__title--image__button other_button"
                                    onClick={() => {
                                        setImageContent("toBeRemoved");
                                        setImageContentAlt("");
                                        handleImagePreview();
                                    }}>Supprimer l'image
                                </div>}
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
                        {(imageContent === "" || imageContent === "toBeRemoved") ? null :
                            <img
                                className="post_maker__box_submit__field__image_preview"
                                src={imagePreviewSrc}
                                alt={imagePreviewAlt}
                            />}
                    </div>
                    {(imageContent === "" || imageContent === "toBeRemoved" ) ? null :
                        <div className="post_maker__box_submit__field">
                            <label className="post_maker__box_submit__field__title" htmlFor="imageContentAlt">Texte alternatif pour l'image</label>
                            <input
                                className="post_maker__box_submit__field__input post_maker__box_submit__field__input--imagealt"
                                type="text"
                                id="imageContentAlt"
                                name="imageContentAlt"
                                defaultValue={imageContentAlt}
                                onChange={(e) => setImageContentAlt(e.target.value)}>
                            </input>
                        </div>
                    }
                    {(submissionEmpty === true) ?
                        <p className="post_maker__box_submit__field post_maker__box_submit__field--error">Impossible de modifier le post en le laissant vide</p> : null}
                    <button className="post_maker__box_submit__button submit_button" type="submit">Modifier le post</button>
                </form>
            </div>
        </React.StrictMode>

    )
}

export default EditPostComponent;