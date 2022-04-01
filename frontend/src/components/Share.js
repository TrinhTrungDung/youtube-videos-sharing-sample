import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import MovieService from "../services/movie.service";

const Share = () => {
    const form = useRef();
    const checkBtn = useRef();
    const [url, setURL] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    
    const onChangeURL = e => {
        const url = e.target.value;
        setURL(url);
    };

    const handleShare = e => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            MovieService.createMovie(url).then(res => {
                setMessage(res.data.message);
                setSuccessful(true);
            }, err => {
                setMessage(err.response.data.message);
                setSuccessful(false);
            });
        }
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <Form onSubmit={handleShare} ref={form}>
                    <div className="form-group">
                        <label htmlFor="url">Youtube URL</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="url"
                            value={url}
                            onChange={onChangeURL}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block">
                            <span>Share</span>
                        </button>
                    </div>
                    {message && (
                    <div className="form-group">
                        <div
                        className={ successful ? "alert alert-success" : "alert alert-danger" }
                        role="alert"
                        >
                        {message}
                        </div>
                    </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>
    );
};
export default Share;