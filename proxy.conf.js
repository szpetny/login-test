{
    const PROXY_CONFIG = [
        {
            context: [
                "/user",
                "/account",
                "/login-check",
                "/logout",
                "/login/cas"
            ],
            target: "http://aspint.hq.eso.org:8086",
            secure: false
        }
    ]

    module.exports = PROXY_CONFIG;
}