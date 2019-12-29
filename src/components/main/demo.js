export default {
    users() {
        const users = {
            'fakeid': {
                id: 'fakeid',
                username: 'Fake User',
                message: 'test message 123 13212123233',
                avatar: require('@/assets/user.png')
            },
            '1': {
                id: '1',
                username: 'Fake User1',
                message: 'asdasdasd33',
                avatar: require('@/assets/user.png')
            },
            '2': {
                id: '2',
                username: 'Fake User2',
                message: 'test sdasda asd 13212444444444444123233',
                avatar: require('@/assets/user.png')
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
                members: ['fakeid', '1', '2'],
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
                            images: [{ id: '3.jpg', filename: '3.jpg' }, { id: '4.jpg', filename: '4.jpg' }]
                        }
                    },
                    {
                        author: '1',
                        content: 'Images reply',
                        attachments: {
                            images: [{ id: '1.jpg', filename: '1.jpg' }, { id: '2.jpg', filename: '2.jpg' }]
                        }
                    }
                ],
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
                ]
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
                        files: [{ name: 'file.a', id: '1', size: '123' }]
                    }
                },
                {
                    author: '2',
                    content: '123',
                    attachments: {
                        files: [{ name: 'file.mp4', id: '1', size: '10' }]
                    }
                },
                {
                    author: 'fakeid',
                    content: '123',
                    attachments: {
                        files: [{ name: 'file.pptx', id: '3', size: '123' }]
                    }
                },
                {
                    author: '2',
                    content: '123',
                    attachments: {
                        files: [{ name: 'file.mp3', id: '4', size: '128' }]
                    }
                },
                ]
            }
        }
    }
};