import React from 'react';
function Filelist() {
    return (
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
    )
}

export default Filelist;