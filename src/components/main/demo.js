export default {
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
                        attachments: [{ id: '3.jpg', filename: '3.jpg', type: 'image/jpeg' }, { id: '4.jpg', filename: '4.jpg', type: 'image/jpeg' }]
                    },
                    {
                        author: {
                            id: '1',
                            name: 'Fake User2',
                        },
                        content: 'Images reply',
                        attachments: [{ id: '1.jpg', filename: '1.jpg', type: 'image/jpeg' }, { id: '2.jpg', filename: '2.jpg', type: 'image/jpeg' }]
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
                        content: ':smile: :smile: :smile: :smile: https://img.ltn.com.tw/Upload/news/600/2019/03/30/phpUCF6ub.jpg'
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
                    content: '',
                    code: {
                        language: 'javascript',
                        content: 'console.log(\'幹我娘\')',
                        stdin: 'dummy input \nqwe qweqweqweas dplmmkncoiasidiaosd\ndqwekqowjemzczkjadasdasdxcnoic\nqweqweqwe\n\nqwqweqweqweqwe\n8q98eqwe',
                        stdout: '幹我娘',
                        stderr: ' zxcaadasdasdasdasdsda\nqewqwwqeqweqw\nxZxzz \neqw   9q8w    78454a4dsds\nqweoqekqwe\nqwqweqweq\nqwqwdczc\nqqeqweqweaaaaaaaaaaaaaaa\n'
                    }
                }]
            }
        }
    }
};