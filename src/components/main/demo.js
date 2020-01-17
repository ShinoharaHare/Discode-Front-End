export default {
    users() {
        const users = {
            'fakeid': {
                id: 'fakeid',
                username: 'Fake User',
                message: 'test message 123 13212123233',
                avatar: require('@/assets/user.png'),
                status: 'online'
            },
            '1': {
                id: '1',
                username: 'Fake User11231321231321233',
                message: 'asdasdasd33',
                avatar: require('@/assets/user.png'),
                status: 'busy'
            },
            '2': {
                id: '2',
                username: 'Fake User2',
                message: 'test sdasda asd 13212444444444444123233',
                avatar: require('@/assets/user.png'),
                status: 'away'
            }
        };

        for (let id in users) {
            users[id].name = users[id].nickname || users[id].username;
        }

        return users;
    },
    channels() {
        return {
            '1': {
                id: '1',
                name: 'Fake Channel1',
                members: {
                    'fakeid': {
                        id: 'fakeid'
                    },
                    '1': {
                        id: '1'
                    },
                    '2': {
                        id: '2'
                    }
                },
                messages: [
                    {
                        author: 'fakeid',
                        content: 'Fake Channel1 sent'
                    },
                    {
                        author: '1',
                        content: 'Fake Channel1 reply'
                    },
                    {
                        author: 'fakeid',
                        content: 'Images sent',
                        attachments: {
                            images: [{ src: 'https://megapx-assets.dcard.tw/images/3e53f4b8-908a-4657-ae20-5bf4058decb6/full.jpeg', filename: 'full.jpeg' }, { src: 'https://cool-style.pixfs.net/cool/2019/10/c5921a594f3da64aba728fa3f5702c551.jpg', name: 'c5921a594f3da64aba728fa3f5702c551.jpg' }]
                        }
                    },
                    {
                        author: '1',
                        content: 'Images reply',
                        attachments: {
                            images: [{ src: 'http://s2.story543.com/imgs/201811/07/5/15415831975267.jpg', name: '15415831975267.jpg' }, { src: 'http://s2.story543.com/imgs/201811/07/5/15415833612685.jpg', name: '15415833612685.jpg' }]
                        }
                    }
                ],
                public: false
            },
            '2': {
                id: '2',
                name: 'Fake Channel2',
                messages: [
                    {
                        author: '2',
                        content: 'Fake Channel2 reply'
                    },
                    {
                        author: 'fakeid',
                        content: 'Fake Channel2 sent'
                    },
                    {
                        author: '2',
                        content: 'https://www.facebook.com/Nye4ni/videos/987895551561737/'
                    },
                    {
                        author: 'fakeid',
                        content: 'https://www.youtube.com/watch?v=ByXoo3ZnKSo'
                    },
                    {
                        author: '2',
                        content: 'https://twitter.com/wolpis_kater/status/1203615380976988160'
                    },
                    {
                        author: '2',
                        content: 'https://www.instagram.com/p/B6Sg_gbHS2a/'
                    },
                    {
                        author: 'fakeid',
                        content: 'https://github.com/deeppomf/DeepCreamPy'
                    },
                    {
                        author: 'fakeid',
                        content: 'https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4'
                    },
                    {
                        author: 'fakeid',
                        content: 'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3'
                    },
                    {
                        author: '2',
                        content: 'https://img.ltn.com.tw/Upload/news/600/2019/03/30/phpUCF6ub.jpg'
                    },
                    {
                        author: '2',
                        content: 'https://codepen.io/Tetsu/pen/rLJyPp'
                    }
                ],
                public: true
            },
            '3': {
                id: '3',
                name: 'Fake Channel3',
                messages: [{
                    author: 'fakeid',
                    content: 'title',
                    code: {
                        language: 'javascript',
                        content: 'console.log(\'幹你娘\')',
                        stdin: 'asdasdasdasdasdasdad zxcasda\nqewqwwqeqweqw\nxZxzz \neqw   9q8w    78454a4dsds\nqweoqekqwe\nqwqweqweq\nqwqwdczc\nqqeqweqweaaaaaaaaaaaaaaa\n',
                        stdout: '幹你娘',
                        stderr: 'dummy stderr zxcasda\nqewqwwqeqweqw\nxZxzz \neqw   9q8w    78454a4dsds\nqweoqekqwe\nqwqweqweq\nqwqwdczc\nqqeqweqweaaaaaaaaaaaaaaa\n'
                    }
                },
                {
                    author: '2',
                    content: 'titlefdsfdsafsd',
                    code: {
                        language: 'javascript',
                        content: 'console.log(\'幹我娘\')',
                        stdin: 'dummy input \nqwe qweqweqweas dplmmkncoiasidiaosd\ndqwekqowjemzczkjadasdasdxcnoic\nqweqweqwe\n\nqwqweqweqweqwe\n8q98eqwe',
                        stdout: '幹我娘',
                        stderr: ' zxcaadasdasdasdasdsda\nqewqwwqeqweqw\nxZxzz \neqw   9q8w    78454a4dsds\nqweoqekqwe\nqwqweqweq\nqwqwdczc\nqqeqweqweaaaaaaaaaaaaaaa\n'
                    }
                },
                {
                    author: 'fakeid',
                    content: '123',
                    attachments: {
                        files: [{ name: 'file.a', src: '1', size: '123' }]
                    }
                },
                {
                    author: '2',
                    content: '123',
                    attachments: {
                        files: [{ name: 'file.mp4', src: '1', size: '10' }]
                    }
                },
                {
                    author: 'fakeid',
                    content: '123',
                    attachments: {
                        files: [{ name: 'file.pptx', src: '3', size: '123' }]
                    }
                },
                {
                    author: '2',
                    content: '1231231231123112312313212312312313213',
                    attachments: {
                        files: [{ name: 'file.mp3', src: '4', size: '128' }]
                    }
                },
                {
                    author: '2',
                    content: '@(國立臺灣海洋大學)',
                },
                ],
                public: true
            },
            '4': {
                id: '4',
                name: 'Fake Channel4',
                messages: {
                    '4-7-51-5': {
                        author: 'fakeid',
                        temp: true
                    },
                    '1': {
                        author: 'fakeid',
                        content: 'Youtube https://youtu.be/40dJS_LC6S8?list=RD40dJS_LC6S8\nFacebook https://www.facebook.com/Nye4ni/videos/987895551561737/\nTwitter https://twitter.com/wolpis_kater/status/1203615380976988160\nInstagram https://www.instagram.com/p/B6Sg_gbHS2a\nGithub https://github.com/deeppomf/DeepCreamPy\nCodePen https://codepen.io/Tetsu/pen/rLJyPp\n影片 https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4\n音樂 https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3\n圖片 https://img.ltn.com.tw/Upload/news/600/2019/03/30/phpUCF6ub.jpg'
                    }
                },
                public: true
            },
            '5': {
                id: '5',
                name: 'Fake Channel5',
                messages: {
                    '1': {
                        author: '1',
                        content: '1\n2\n3\n4\n5'
                    }
                },
                public: true
            }
        }
    }
};