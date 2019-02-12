import React from 'react';

function ModalUpload() {
    return (
        <div class="modal is-active">
            <div class="modal-background" style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                <div class="modal-content" syle={{display:"flex", justifyContent:"center"}}>
                    <div class="box column is-8 is-offset-2">
                        <h1 class="title has-text-centered" style={{color:"#018e79"}}>File Upload</h1>
                        <p class="is-3">Click Browse, to select a File, and then click Upload</p>
                        <p class="is-3" >You can upload multiple files.</p>
                        <hr />
                        <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                            <div>File 1.ext</div>
                            <div>File 2.ext</div>
                            <div>File 3.ext</div>
                        </div>
                        <hr />
                        <div class="file has-name" style={{ display: "flex", justifyContent: "center" }}>
                            <label class="file-label">
                                <input class="file-input" type="file" name="resume" multiple/>
                                <span class="file-cta">
                                    <span class="file-icon">
                                        <i class="fas fa-upload"></i>
                                    </span>
                                    <span class="file-label is-primary">
                                        Upload
                                    </span>
                                </span>
                                <span class="file-name">
                                    Browse...
                                </span>
                            </label>
                        </div>

                    </div>
                </div>
            </div>
            <button class="modal-close is-large" aria-label="close"></button>
        </div>
    )
}

export default ModalUpload;