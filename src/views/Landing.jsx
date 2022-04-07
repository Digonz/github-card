import { useState } from "react";
import Swal from "sweetalert2";

const Landing = () => {
    const [id, setId] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    console.log("dat -->", data);
    const Create = async (e, id) => {
        e.preventDefault();
        setLoading(true);
        return await fetch(`//api.github.com/users/${id}`)
            .then(
                response => response.json(),
                console.log(id, " exist"),
                Toast.fire({
                    icon: 'success',
                    title: `${id} es correcto`
                })
            ).then((dt) => setData(dt), setLoading(false));

        /* Swal.fire({
            title: 'Submit your Github username',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Look up',
            showLoaderOnConfirm: true,
            preConfirm: (login) => {
                return fetch(`//api.github.com/users/${login}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(response.statusText)
                        }
                        return response.json()
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: `${result.value.login}'s avatar`,
                    imageUrl: result.value.avatar_url
                })
            }
        }) */
    }
    return (
        <>
            <div className="col-md-6 mx-auto text-center">
                <h1>Github Card</h1>
                <div className="form-floating mb-3 mt-3">
                    <input type="text" className="form-control text-lowercase" id="name" placeholder="ingresa tu nombre de usuario en Github" name="name"
                        onChange={e => setId(e.target.value)} value={id}
                        onKeyUp={e => e.code === 'Enter' && Create(e, id)}
                    />
                    <label htmlFor="name">Nombre de Usuario </label>
                </div>
                <button className="btn btn-success px-5" onClick={(e) => Create(e, id)}>Crear</button>
            </div>
            {
                data === null || id === ""  ?
                    null
                    :
                    <div>
                        {
                            loading ?
                                <div class="spinner-grow text-warning"></div>
                                :
                                <>
                                    <h1>Tarjeta</h1>
                                    <br />
                                    <div className="col-4 row mx-auto p-2" style={{ border: "2px solid lightgray", borderRadius: 15 }}>
                                        <div className="col-5 py-5">
                                            <img className="" src={data.avatar_url} alt="avatar" width={200} style={{ borderRadius: 10 }} />
                                        </div>
                                        <div className="col-7 text-center my-auto" >
                                            <h2>{data.login}</h2>
                                            <p>{data.company}</p>
                                            <p>Repos: {data.public_repos}</p>
                                            <a href={data.html_url} target="_blank" rel="noopener noreferrer">{data.html_url}</a>
                                        </div>
                                    </div>
                                    <div className="col-4  mx-auto p-5" style={{ border: "2px solid lightgray", borderRadius: 15 }}>
                                        <div className="my-auto py-5">
                                            GitHub
                                        </div>
                                    </div>
                                </>
                        }
                    </div>
            }
        </>
    );
};
export default Landing;