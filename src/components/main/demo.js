export default {
    user() {
        return {
            id: 'fakeid',
            username: 'Fake User',
            message: 'test message 123 13212123233',
            icon: require('@/assets/user.png')
        }
    },
    channels() {
        return {
            '1': {
                id: '1',
                name: 'Fake Channel1',
                messages: [
                    {
                        author: {
                            id: 'fakeid',
                            name: 'Fake User'
                        },
                        content: 'Fake Channel1 sent'
                    },
                    {
                        author: {
                            id: '1',
                            name: 'Fake User2',

                        },
                        content: 'Fake Channel1 reply'
                    },
                    {
                        author: {
                            id: 'fakeid',
                            name: 'Fake User'
                        },
                        content: 'Images sent',
                        attachments: {
                            images: [{ id: '3.jpg', filename: '3.jpg' }, { id: '4.jpg', filename: '4.jpg' }]
                        }
                    },
                    {
                        author: {
                            id: '1',
                            name: 'Fake User2',
                        },
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
                        author: {
                            id: '2',
                            name: 'Fake User3'
                        },
                        content: 'Fake Channel2 reply'
                    },
                    {
                        author: {
                            id: 'fakeid',
                            name: 'Fake User',

                        },
                        content: 'Fake Channel2 sent'
                    },
                    {
                        author: {
                            id: '2',
                            name: 'Fake User3'
                        },
                        content: 'https://www.facebook.com/Nye4ni/videos/987895551561737/'
                    },
                    {
                        author: {
                            id: 'fakeid',
                            name: 'Fake User',
                        },
                        content: 'https://www.youtube.com/watch?v=ByXoo3ZnKSo'
                    },
                    {
                        author: {
                            id: '2',
                            name: 'Fake User3'
                        },
                        content: 'https://twitter.com/wolpis_kater/status/1203615380976988160'
                    },
                    {
                        author: {
                            id: '2',
                            name: 'Fake User2',
                        },
                        content: 'https://www.instagram.com/p/B6Sg_gbHS2a/'
                    },
                    {
                        author: {
                            id: 'fakeid',
                            name: 'Fake User',
                        },
                        content: 'https://github.com/deeppomf/DeepCreamPy'
                    },
                    {
                        author: {
                            id: 'fakeid',
                            name: 'Fake User',
                        },
                        content: 'https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4'
                    },
                    {
                        author: {
                            id: 'fakeid',
                            name: 'Fake User',
                        },
                        content: 'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3'
                    },
                    {
                        author: {
                            id: '2',
                            name: 'Fake User3'
                        },
                        content: 'https://img.ltn.com.tw/Upload/news/600/2019/03/30/phpUCF6ub.jpg'
                    },
                    {
                        author: {
                            id: '2',
                            name: 'Fake User3'
                        },
                        content: 'https://codepen.io/Tetsu/pen/rLJyPp'
                    }
                ]
            },
            '3': {
                id: '3',
                name: 'Fake Channel3',
                messages: [{
                    author: {
                        id: 'fakeid',
                        name: 'Fake User'
                    },
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
                    author: {
                        id: '2',
                        name: 'Fake User2',
                    },
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
                    author: {
                        id: 'fakeid',
                        name: 'Fake User'
                    },
                    content: '123',
                    attachments: {
                        files: [{name: 'file.abc', icon: require('@/assets/unknown.svg'), id: '1', size: '123.2KB'}]
                    }
                },
                {
                    author: {
                        id: '2',
                        name: 'Fake User2',
                    },
                    content: '123',
                    attachments: {
                        files: [{name: 'file.abc', icon: require('@/assets/unknown.svg'), id: '1', size: '123.2KB'}]
                    }
                },
                ]
            }
        }
    }
};