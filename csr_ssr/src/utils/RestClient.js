import axios from 'axios';

function getCookie(name) {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    if (match) return match[2];
}

const getRefreshToken = () => getCookie('refreshToken');
const getHomeAccountId = () => getCookie('homeAccount');





export const getAccessTokenCB = async (tokenType) => {
    let resp;
    try {
        resp = await axios.post('/auth/user', { homeAccountId: getHomeAccountId(), refreshToken: getRefreshToken() });
        return resp.accessToken[`${tokenType}`];
    } catch (err) {
        console.log(
            'remoteHeader.getAccessTokenCB',
            JSON.stringify({
                err,
            })
        );
    }
    return null;
};
export default {
    getAccessTokenCB,
};
