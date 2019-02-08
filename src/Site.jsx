import React from 'react'

function Site() {
    return (
        <div>
            <section class="section is-paddingless" style={{ marginTop: "5px", paddingBottom: "5px" }}>
                <div class="container">
                    {/* User header */}
                    <div class="column" style={{ display: "flex", justifyContent: "flex-end" }}>
                        <div class="column is-one-third is-paddingless">
                            <div class="columns column" style={{ paddingRight: 0, paddingBottom: "25px", display: "flex", justifyContent: "space-between", alignSelf: "center" }}>
                                <div><i class="far fa-star" /> Upgrade account</div>
                                <div><i class="far fa-bell" /></div>
                                <div><i class="far fa-user-circle" /> Samuel Ng <i class="fas fa-caret-down" /></div>
                            </div>
                        </div>
                    </div>
                    {/* Sidebar */}
                    <div>
                        <a href="#"><i /> Files</a>
                        <a href="#"><i /> Photos</a>
                        <a href="#"><i /> Sharing</a>
                        <a href="#"><i /> Links</a>
                        <a href="#"><i /> Events</a>
                    </div>
                    {/* Header with search */}
                    <div class="columns">
                        <div class="column">
                            <h1 class="title">Bropdox</h1>
                        </div>
                        <div class="columns column">
                            <div class="column is-one-third" style={{ display: "flex", justifyContent: "space-around", alignSelf: "center" }}>
                                <i class="fas fa-file-upload" />
                                <i class="fas fa-folder-plus" />
                                <i class="fas fa-share-alt-square" />
                                <i class="fas fa-trash-alt" />
                            </div>
                            <div class="column">
                                <input class="input" type="text" placeholder="Search" />
                            </div>
                        </div>
                    </div>
                    {/* File list header */}
                    <div> {/*File List Div */}
                        <div>
                            <table class="table is-fullwidth">
                                <thead>
                                    <tr>
                                        <td class="is-paddingless">
                                            <span class="fl-header ">Information Systems(1)</span>
                                            <a class="fl-header" href="#"><i class="fas fa-file-download" /> Download</a>
                                            <a class="fl-header" href="#"><i class="fas fa-trash-alt" /> Delete...</a>
                                            <a class="fl-header" href="#"><i class="fas fa-pen" /> Rename</a>
                                            <a class="fl-header" href="#"><i class="fas fa-file-export" /> Move...</a>
                                            <a class="fl-header" href="#"><i class="far fa-images" /> Create album</a>
                                        </td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        {/* File list */}
                        <table class="table is-fullwidth is-striped fl-table">
                            <tbody>
                                <tr>
                                    <td ><i class="far fa-folder fa-2x " /> 28th Richmond</td>
                                    <td>shared folder</td>
                                    <td>--</td>
                                    <td></td>
                                </tr>
                                <tr class="is-selected">
                                    <td><i class="far fa-folder fa-2x " /> Information Systems(1)</td>
                                    <td>shared folder</td>
                                    <td>--</td>
                                    <td><button class="button">Share <i class="fas fa-caret-down" /></button></td>
                                </tr>
                                <tr>
                                    <td><i class="far fa-folder fa-2x " /> Intranet</td>
                                    <td>shared folder</td>
                                    <td>--</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><i class="far fa-folder fa-2x " /> Literature</td>
                                    <td>folder</td>
                                    <td>--</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><i class="far fa-folder fa-2x " /> School</td>
                                    <td>folder</td>
                                    <td>--</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><i class="far fa-folder fa-2x " /> Sharing</td>
                                    <td>folder</td>
                                    <td>--</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><i class="far fa-folder fa-2x " /> Test</td>
                                    <td>shared folder</td>
                                    <td>--</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><i class="far fa-folder fa-2x " /> TitaniumBackup</td>
                                    <td>folder</td>
                                    <td>--</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><i class="far fa-folder fa-2x " /> TitaniumBackupOld</td>
                                    <td>folder</td>
                                    <td>--</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><i class="far fa-folder fa-2x " /> Workplace Files</td>
                                    <td>folder</td>
                                    <td>--</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Site;
