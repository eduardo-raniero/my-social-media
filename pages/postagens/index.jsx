import { useState, useEffect } from 'react'

//NEXT
import  useRouter  from 'next/router';

//NewPostValidation
import useFormLogin from '../../utils/FormValidation/newPost/useForm';
import validateInfoPost from '../../utils/FormValidation/newPost/validateInfo';

//EditPostValidation
import useFormEdit from '../../utils/FormValidation/editedPost/useForm';
import validateInfoEdit from '../../utils/FormValidation/editedPost/validateInfo';

//NewCommentValidation
import useFormComment from '../../utils/FormValidation/newComment/useForm';
import validateInfoComment from '../../utils/FormValidation/newComment/validateInfo';

//EditCommentValidation
import useFormEditComment from '../../utils/FormValidation/editComment/useForm';
import validateInfoEditComment from '../../utils/FormValidation/editComment/validateInfo';

//POPUP
import swal from '@sweetalert/with-react'

//COLLAPSE
import {Collapse} from 'react-collapse';

//CSS
import styles from './posts.module.scss'

//ICONS
import { IoAddCircleOutline, IoChatbox } from 'react-icons/io5';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { MdEdit, MdClose } from 'react-icons/md';

export default function Posts(){
    const [loggedUser, setLoggedUser] = useState({});
    const [popUp, setPopUp] = useState('none');
    const [allPosts, setAllPosts] = useState([])

    const [newPost, setNewPost] = useState(false);
    const [editPost, setEditPost] = useState(false);
    const [newComment, setNewComment] = useState(null);
    const [editComment, setEditComment] = useState(null)

    const [defaultCollapse, setDefaultCollapse] = useState(true);
    const [toggleComment, setToggleComment] = useState(null);

    const { handleChange, values, handleSubmit, isDisabled, isRedirecting } = useFormLogin(validateInfoPost);
    const { handleEdition, editedValues, setEditedValues, handleSubmitEdit, isDisabledEdit, isRedirectingEdit } = useFormEdit(validateInfoEdit);
    const { handleCommentChange, setCommentValues, commentValues, handleCommentSubmit, isDisabledComment} = useFormComment(validateInfoComment);
    const { handleEditionComment, editedCommentValues, setEditedCommentValues, handleSubmitEditComment, isDisabledEditComment } = useFormEditComment(validateInfoEditComment)
    

  
    useEffect(() => {
        if(localStorage.getItem('loggedUser') === null){
            useRouter.push('/');
        }

        if(localStorage.getItem('loggedUser')){
            const user = JSON.parse(localStorage.getItem('loggedUser'));
            setLoggedUser(user[0]);
        }

        if(localStorage.getItem('postsList') === null){
            localStorage.setItem('postsList', '[]');
        }

        if(localStorage.getItem('postsList')){
            const postsArr = JSON.parse(localStorage.getItem('postsList'))
            
            //Lista reversa para que os posts recentes apareçam primeiro
            let reversePostsList = postsArr.reverse()
            setAllPosts(reversePostsList);
        }

    }, []);

    //Logout menu toggle
    const handlePopUp = () => {
        popUp === 'none' ? setPopUp('block') : setPopUp('none')
    }

    //Logout user
    const handleLogout = () => {
        localStorage.removeItem('loggedUser');
        useRouter.push('/')
    }

    //open new post form
    const handleNewPost = () => {
        setNewPost(!newPost)
    }

    //open edit post form
    const handleEditPost = (e) => {
        setEditedValues({
            id: e.id,
            user_id: e.user_id,
            postTitle: e.title,
            postContent: e.content,
            username: e.username,
            date: e.date,
            comments: e.comments
        })
        
        setEditPost(!editPost)
    }

    //delete post with warning
    const handleDeletePost = (e) => {
        const postId = e.id

        swal({
            text: "Você realmente deseja deletar esse post?",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
              if (willDelete) {
                const allPosts = JSON.parse(localStorage.getItem('postsList'))
    
                let obj = allPosts.filter(item => item.id === postId)[0]
    
                let index = allPosts.indexOf(obj, 0)
    
                allPosts.splice(index, 1)
            
                localStorage.setItem('postsList', JSON.stringify(allPosts))
            
                swal("Post deletado com sucesso!", {
                    icon: "success",
                });
    
                    window.location.reload()
            }
        });
        

    }

    //Add new Comment
    const handleNewComment = (e) => {
        setCommentValues({
            id: '',
            post_id: e,
            user_id: loggedUser.id,
            content: '',
            username: loggedUser.username
        })

        setNewComment(e)

    }

    //Edit Comment
    const handleEditComment = (e, post) => {
        const {id, content, user_id} = e

        setEditedCommentValues({
            id: id,
            user_id: user_id,
            content: content,
            post_id: post.id,
            username: e.username
        });

        setEditComment(post.id)
        
    }

    //Delete Comment
    const handleDeleteComment = (e, post) => {
        swal({
            text: "Você realmente deseja deletar esse Comentário?",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
              if (willDelete) {
                const posts = JSON.parse(localStorage.getItem('postsList'))
                const commentId = (e.id - 1)
                const obj = posts.filter(item => item.id === post.id)[0]
        
                obj.comments.splice(commentId, 1)
                posts.splice((post.id - 1), 1, obj)
            
                localStorage.setItem('postsList', JSON.stringify(posts))
            
                swal("Comentário deletado com sucesso!", {
                    icon: "success",
                });
    
                window.location.reload()
            }
        });
    }
    
    return(
        <div className={styles.aligner}>
            <div className={styles.userBox}>
                <div onClick={handlePopUp}>
                    <span>{loggedUser?.name}</span>
                    <span> <IoIosArrowDown /> </span>
                </div>

                <div style={{display: `${popUp}`, background: '#fff', color: '#1e1e1e', borderRadius: '2px', padding: '1rem', width: '5rem', textAlign: 'center', margin: '0.25rem 0 0 12.5rem', position: 'absolute'}}>
                    <span onClick={handleLogout} style={{cursor: 'pointer'}}>Logout</span>
                </div>
            </div>


            <div onClick={handleNewPost} className={styles.newPost}> <IoAddCircleOutline /> Novo Post </div>

            {
                newPost ? 
                <div className={styles.postItem}>
                    <form method='POST' onSubmit={handleSubmit}>
                        <div className={styles.Header}>
                            <input 
                                onChange={handleChange} 
                                value={values.postTitle}
                                maxLength="35"
                                minLength="2"
                                type="text" 
                                name="postTitle" 
                                id="postTitle" 
                                placeholder='Aqui vai o título...'
                            />
                            <br />
                        </div>
                            <textarea 
                                name="postContent"
                                id="postContent"
                                maxLength="300"
                                minLength="1"
                                value={values.postContent}
                                placeholder='Escreva aqui seu pensamento...'
                                onChange={handleChange}
                                style={{
                                    border: 'none',
                                    marginTop: '1.6rem',
                                    background: 'rgba(0,0,0,0)',
                                    width: '100%',
                                    maxWidth: '100%',
                                    minWidth: '100%',
                                    maxHeight: '10rem',
                                    minHeight: '10rem',
                                    color: '#1e1e1e',
                                    fontSize: '1rem',
                                    marginBottom: '1rem',
                                    resize: 'none',
                                    lineHeight: '1.5rem'
                                }}
                            >
                            </textarea>

                            <div style={{maxWidth: '7rem'}}>
                                <button type='submit' disabled={isDisabled}> {isRedirecting ? 'Publicando...' : 'Publicar'} </button>
                            </div>
                    </form>
                </div>
                
                : null
            }

            {
                editPost ?
                <div className={styles.postItem}>
                    <form method='POST' onSubmit={handleSubmitEdit}>
                        <div className={styles.Header}>
                            <input 
                                value={editedValues.postTitle}
                                onChange={handleEdition}
                                maxLength="35"
                                minLength="2"
                                type="text" 
                                name="postTitle" 
                                id="postTitle" 
                                placeholder='Aqui vai o título...'
                            />
                            <br />
                        </div>
                            <textarea 
                                value={editedValues.postContent}
                                onChange={handleEdition}
                                name="postContent"
                                id="postContent"
                                maxLength="300"
                                minLength="1"
                                placeholder='Escreva aqui seu pensamento...'
                                style={{
                                    border: 'none',
                                    marginTop: '1.6rem',
                                    background: 'rgba(0,0,0,0)',
                                    width: '100%',
                                    maxWidth: '100%',
                                    minWidth: '100%',
                                    maxHeight: '10rem',
                                    minHeight: '10rem',
                                    color: '#1e1e1e',
                                    fontSize: '1rem',
                                    marginBottom: '1rem',
                                    resize: 'none',
                                    lineHeight: '1.5rem'
                                }}
                            >
                            </textarea>

                            <div style={{maxWidth: '15rem', marginTop: '1.5rem'}}>
                                <button style={{width: '8rem'}} type='submit' disabled={isDisabledEdit}> {isRedirectingEdit ? 'Salvando...' : 'Salvar Edição'} </button>
                            </div>
                    </form>
                </div>

            : null
            }

            {
                allPosts.length === 0 ?
                    <div className={styles.postItem}>
                        <div className={styles.Header}>
                            <h2>Seu título ficará aqui</h2>
                            <div>
                                <MdEdit />
                                <MdClose />
                            </div>
                        </div>
                        <p>Este é um exemplo de como suas postagens ficarão nessa mini rede social chamada "MySocialMedia". Sinta-se livre para clicar no botão "+ Novo Post" acima e criar seu primeiro post. O limite para títulos é de <strong>35</strong> caracteres e para o conteúdo do post é <strong>300</strong> caracteres.</p>

                        <div>
                            <code>Username</code>
                            <span onClick={() => setDefaultCollapse(!defaultCollapse)}>(1) Comentários {defaultCollapse ? <IoIosArrowUp /> : <IoIosArrowDown />} </span>
                        </div>
                        <hr />
                        <br />
                        <Collapse isOpened={defaultCollapse}>
                            <div>Aqui ficarão os comentários</div>
                        </Collapse>
                    </div>
                
                :
                
                allPosts.map((item)=> (
                    <div key={item.id} className={styles.postItem}>
                        <div className={styles.Header}>
                            <h2>{item.title}</h2>
                            {
                                item.username === loggedUser.username ?
                                <div>
                                    <MdEdit style={{cursor: 'pointer'}} onClick={() => handleEditPost(item)}/>
                                    <MdClose style={{cursor: 'pointer'}} onClick={() => handleDeletePost(item)} />
                                </div>
                                :null
                            }
                        </div>
                        <p> {item.content} </p>
        
                        <div>
                            <code>{item.username + ' - ' + item.date}</code>
                            <span >({item.comments.length}) Comentários </span>
                        </div>
                        <hr />
                        <div style={{marginTop:'1.5rem'}} className={styles.commentsList}>
                            {
                                item.comments.map(comment => (
                                    <div key={comment.id} style={{minWidth: '100%'}}>
                                        <div style={{display: 'flex', flexDirection: 'row'}}>
                                            <strong> {comment.username} </strong>
                                            {
                                                comment.username === loggedUser.username ?
                                                <div style={{color: '#1e1e1e', opacity: '.5', display: 'flex', flexDirection: 'row'}}>
                                                    <MdEdit style={{cursor: 'pointer'}} onClick={() => handleEditComment(comment, item)}/>
                                                    <MdClose style={{cursor: 'pointer', marginLeft: '1rem'}} onClick={() => handleDeleteComment(comment, item)} />
                                                </div>
                                                :null
                                            }
                                        </div>
                                        <p> {comment.content} </p>
                                    </div>                              
                                ))
                            }

                            {
                                editComment === item.id ?
                                <form method='POST' onSubmit={handleSubmitEditComment}>
                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                        <input 
                                            value={editedCommentValues.content}
                                            onChange={handleEditionComment}
                                            type="text" 
                                            name="content" 
                                            id="content" 
                                            placeholder='Comentar...'
                                            minLength={2}
                                            maxLength={300} 
                                            style={{padding: '.8rem .8rem .8rem 1rem', border: 'none', width: '30rem', marginBottom: '1rem', marginTop: '0rem', background: '#e9e9e9', borderRadius: '10rem'}}
                                        />
                                        <button
                                            style={{padding: '.8rem .8rem .8rem 1rem', border: 'none', width: '6rem', borderRadius: '10rem',  marginBottom: '1rem'}}
                                            type="submit"
                                            disabled={isDisabledEditComment}
                                        >
                                            Salvar
                                        </button>
                                    </div>
                                </form>
                                :null
                            }
                        </div>
                            
                            <span onClick={() => handleNewComment(item.id)} style={{color: '#1e1e1e', opacity: '.5', cursor: 'pointer', marginBottom: '1rem'}}> <IoChatbox /> Comentar</span>

                            {
                                newComment === item.id ?
                                <form method='POST' onSubmit={handleCommentSubmit}>
                                    <br />
                                    <code> {commentValues.username} </code>
                                    <br />
                                    <div style={{display: 'flex'}}>
                                        <input 
                                            value={commentValues.content}
                                            onChange={handleCommentChange}
                                            type="text" 
                                            name="content" 
                                            id="content" 
                                            placeholder='Comentar...' 
                                            style={{padding: '.8rem .8rem .8rem 1rem', border: 'none', width: '30rem', marginTop: '.25rem', background: '#e9e9e9', borderRadius: '10rem'}}
                                        />
                                        <button
                                            style={{padding: '.8rem .8rem .8rem 1rem', border: 'none', width: '6rem', borderRadius: '10rem'}}
                                            type="submit"
                                            disabled={isDisabledComment}
                                        >
                                            Publicar
                                        </button>
                                    </div>
                                </form>
                                : null
                            }

                    </div>
                ))
            }
        </div>

    )
}