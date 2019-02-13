import React from 'react';
function FilelistHeader() {
    return (
        <div>
            <table class="table is-fullwidth">
                <thead>
                    <tr>
                        <td class="is-paddingless">
                            <span class="fl-header ">Information Systems(1)</span>
                            <a class="fl-header" href="#"><i class="fas fa-trash-alt" /> Delete...</a>
                            <a class="fl-header" href="#"><i class="fas fa-pen" /> Rename</a>
                            <a class="fl-header" href="#"><i class="fas fa-file-export" /> Move...</a>
                        </td>
                    </tr>
                </thead>
            </table>
        </div>
    )
}

export default FilelistHeader;