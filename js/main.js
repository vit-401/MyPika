  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBSVBpzkU3WOAO8eO6uZ3HJaXRkfXLdJGQ",
    authDomain: "picadu-ad3cd.firebaseapp.com",
    databaseURL: "https://picadu-ad3cd.firebaseio.com",
    projectId: "picadu-ad3cd",
    storageBucket: "picadu-ad3cd.appspot.com",
    messagingSenderId: "801059823316",
    appId: "1:801059823316:web:b3ad76568878ac9b9d2541"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  console.log(firebase);



  // Создаем переменную, в которую положим кнопку меню
  let menuToggle = document.querySelector('#menu-toggle');
  // Создаем переменную, в которую положим меню
  let menu = document.querySelector('.sidebar');
  // отслеживаем клик по кнопке меню и запускаем функцию 
  menuToggle.addEventListener('click', function (event) {
    // отменяем стандартное поведение ссылки
    event.preventDefault();
    // вешаем класс на меню, когда кликнули по кнопке меню 
    menu.classList.toggle('visible');
  })

  const elemEmail = document.querySelector('.form__email'),
    elemPassword = document.querySelector('.form__password'),
    elemForgetin = document.querySelector('.form__forgetin'),
    btnSignIn = document.querySelector('.form__signIn'),
    elemSignUp = document.querySelector('.form__signUp'),
    elemForm = document.querySelector('.form__autorization'),


    elemUser = document.querySelector('.user'),
    elemSlideBar = document.querySelector('.sidebar-nav'),
    elemBtnNewPost = document.querySelector('.button-new-post'),
    userName = document.querySelector('.user-name'),
    exit = document.querySelector('.exit'),
    editContainer = document.querySelector('.edit__container'),
    editBtn = document.querySelector('.edit__btn'),
    userSetings = document.querySelector('.user__setings'),
    useAvatar = document.querySelector('.user-avatar'),
    InpuserName = document.querySelector('.input__userName'),
    userPhoto = document.querySelector('.input__userPhoto'),



    postWrapper = document.querySelector('.posts'),
    buttonNewPost = document.querySelector('.button-new-post'),
    addPostElem = document.querySelector('.add-post'),
    formАorgetin = document.querySelector('.form__forgetin'),


    DEFAULT_POPTO = useAvatar.src




  // const dataUsers = [
  //   {
  //     email: 'kate@gmail.com',
  //     password: '12345',
  //     nicName: 'Kate'
  //   },
  //   {
  //     email: 'vitaliy@gmail.com',
  //     password: '12345',
  //     nicName: 'Vitaliy',
  //     photo: 'https://scontent.fiev22-1.fna.fbcdn.net/v/t1.0-9/42214721_2059364297708438_3737811347950272512_n.jpg?_nc_cat=107&ccb=2&_nc_sid=174925&_nc_ohc=Dv1pFvHhonAAX8kxwNr&_nc_ht=scontent.fiev22-1.fna&oh=bd4bdaa57abdfab81838f79b9e40a673&oe=5FD2CFDE'
  //   }
  // ]

  const setUsers = {
    user: null,

    innitUser(hendler) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.user = user
          console.log('user: ', user);
        } else {
          this.user = null
        }
        if (hendler) {
          hendler()
        }
      })
    },

    autorization(email, password) {
      // const user = this.getUser(email)
      // if (user && user.password === password) {
      //   this.autorizUser(user)
      // } else {
      //   console.log("Вход выполнен неправильно");
      // }
      firebase.auth().signInWithEmailAndPassword(email, password)
        // .then((data) => this.user = data.user)
        // then(hendler)
        .catch((err) => {
          const errCode = err.code;
          const errMessage = err.message;
          if (errCode === 'auth/wrong-password') {
            console.log(errMessage);
            alert('неверный пароль')
          } else if (errCode == 'auth/user-not-found') {
            console.log(errMessage);
            alert('пользователь ненайден')
          } else {
            alert(errMessage)
          }
          console.log(err);
        })
    },
    logOut(hendler) {
      // this.user = null
      firebase.auth().signOut()
      hendler()
    },
    registration(email, password) {
      if (this.p(email) || this.p(password)) {
        alert('Регистрация прошла успешно!')
      } else {
        alert('Введите что-то')
      }
      if (this.validateEmail(email)) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((data) => {
            this.editUser(email.substring(0, email.indexOf('@')), null)
            console.log("data: ", data);
          })
          .catch(err => {
            const errCode = err.code;
            const errMessage = err.message;
            if (errCode === 'auth/week-password') {
              console.log(errMessage);
              alert('слабый пароль')
            } else if (errCode == 'auth/email-already-in-use') {
              console.log(errMessage);
              alert('Этот мейл уже используеться')
            } else {
              alert(errMessage)
            }

            console.log(err);
          })

        // ________________
        // if (!this.getUser(email)) {
        //   s = []
        //   for (let i = 0; i < email.length; i++) {
        //     if (email[i] === '@') {
        //       break
        //     }
        //     s[0] = email[0].toUpperCase()
        //     s[i] = email[i].toLowerCase()
        //   }

        //   dataUsers.push({
        //     email: email.toLowerCase(),
        //     password: password.toLowerCase(),
        //     nicName: s.join('')
        //   })
        //   console.log(dataUsers);
        // } else {
        //   alert(`Пользователь с таким Email: ${email}  уже зарегистрирован`)
        // }
      }
    },
    p(s) {
      if (s === '') {
        return false
      } else {
        return true
      }
    },

    // signInError() {
    //   console.log('signInError');
    // },
    // getUser(email) {
    //   return dataUsers.find(item => item.email === email)
    // },
    // autorizUser(user) {
    //   this.user = user
    // },

    validateEmail(email) {
      if (/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email)) {
        return (true)
      }
      return (false)
    },
    editUser(displayName, photoURL, hendler) {
      const user = firebase.auth().currentUser

      if (displayName) {
        if (photoURL) {
          user.updateProfile({
            displayName,
            photoURL
          }).then(hendler)
        } else {
          user.updateProfile({
            displayName
          }).then(hendler)
        }
      }
    },
    sendForget(email) {
      firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
          alert('Письмо отправленно')
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  const toogleFunctionUser = () => {
    const user = setUsers.user

    if (user) {
      elemForm.style.display = 'none',
        elemSlideBar.style.display = '',
        elemBtnNewPost.style.display = '',
        elemUser.style.display = ''
      userName.textContent = user.displayName,
        useAvatar.src = user.photoURL ? user.photoURL : useAvatar.src
    } else {
      elemForm.style.display = '',
        elemSlideBar.style.display = 'none',
        elemBtnNewPost.style.display = 'none',
        elemUser.style.display = 'none'
      addPostElem.classList.remove('visible')
    }

  }
  const togleVisibli = (varebel) => {
    varebel.classList.toggle('visible')
  }
  buttonNewPost.addEventListener('click', (e) => {
    e.preventDefault();
    togleVisibli(addPostElem)
  })


  formАorgetin.addEventListener('click',
    e => {
      e.preventDefault()
      setUsers.sendForget(elemEmail.value)
    })

  elemForm.addEventListener('submit', (e) => {
    e.preventDefault()
    setUsers.autorization(elemEmail.value, elemPassword.value)
    toogleFunctionUser()
    elemForm.reset();
  })
  elemSignUp.addEventListener('click', (e) => {
    setUsers.registration(elemEmail.value, elemPassword.value)
  })
  exit.addEventListener('click', () => {
    setUsers.logOut(toogleFunctionUser)
  })
  userSetings.addEventListener('click', () => {
    togleVisibli(editContainer)
  })
  editContainer.addEventListener('submit', (e) => {
    e.preventDefault();
    setUsers.editUser(InpuserName.value, userPhoto.value, toogleFunctionUser);
    editContainer.reset();
  })
  toogleFunctionUser()

  const setPost = {
    allPosts: [
      // {
      //     title: 'Заголовлок поста',
      //     text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит! ',
      //     tegs: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
      //     author: {
      //       displayName: 'Vit',
      //       photo: 'https://scontent.fiev22-2.fna.fbcdn.net/v/t1.0-9/40655308_2051039438540924_3778438040603590656_o.jpg?_nc_cat=111&ccb=2&_nc_sid=174925&_nc_ohc=A_wHvtgXks8AX_EwDj_&_nc_ht=scontent.fiev22-2.fna&oh=dc0aa08ee9b3cc2fcb12f3ba875fd29c&oe=5FD3AE97'
      //     },
      //     date: '11.11.2020, 20:54:00',
      //     like: 15,
      //     coments: 5

      //   },
      //   {
      //     title: 'Заголовлок поста 2',
      //     text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe iure explicabo aperiam inventore natus culpa ullam, dolorum nobis, vitae consequuntur totam quia consectetur maxime velit minima! Ducimus numquam adipisci nisi cum iste mollitia earum, blanditiis alias nihil consequuntur sapiente eaque voluptatum perspiciatis neque aperiam! Odit, saepe sapiente harum earum est animi autem quidem voluptatibus. Ipsa optio totam deserunt facere eius!',
      //     tegs: ['свежее', 'asd', 'горячее', 'мое', 'случайность'],
      //     author: {
      //       displayName: 'Vit',
      //       photo: 'https://scontent.fiev22-1.fna.fbcdn.net/v/t1.0-9/42214721_2059364297708438_3737811347950272512_n.jpg?_nc_cat=107&ccb=2&_nc_sid=174925&_nc_ohc=Dv1pFvHhonAAX8kxwNr&_nc_ht=scontent.fiev22-1.fna&oh=bd4bdaa57abdfab81838f79b9e40a673&oe=5FD2CFDE'
      //     },
      //     date: '11.11.2020, 20:54:00',
      //     like: 45,
      //     coments: 10
      //   },
    ],
    addPost(title, text, tags, hendler) {
      this.allPosts.unshift({
        id: `postID${(+new Date()).toString(16)}`,
        title,
        text,
        tegs: tags.split(', '),
        author: {
          displayName: setUsers.user.displayName,
          photo: setUsers.user.photoURL
        },
        date: new Date().toLocaleString(),
        like: 0,
        coments: 0
      })
      firebase.database().ref('post').set(this.allPosts)
        .then(() => this.getPosts(hendler))
    },
    getPosts(hendler) {
      firebase.database().ref('post').on('value', snapshot => {
        this.allPosts = snapshot.val() || [];
        hendler()
      })
    }
  }
  setUsers.innitUser(toogleFunctionUser)





  const showPostAll = () => {
    let postsHTML = '';
    setPost.allPosts.forEach(({
      title,
      text,
      tegs,
      date,
      like,
      coments,
      author
    }) => {
      postsHTML += `
  <section class="post">
  <div class="post-body">
    <h2 class="post-title">${title}</h2>
    <p>${text}</p>
    <div class="tags">${ tegs.map((item) => { return `<a href="#" class="tag">#${item}</a>`}).join('')}</div>
  </div>
  <div class="post-footer">
    <div class="post-buttons">
      <button class="post-button likes">
        <svg width="19" height="20" class="icon icon-like">
          <use xlink:href="img/icons.svg#like"></use>
        </svg>
        <span class="likes-counter">${like}</span>
      </button>
      <button class="post-button comments">
        <svg width="21" height="21" class="icon icon-comment">
          <use xlink:href="img/icons.svg#comment"></use>
        </svg>
        <span class="comments-counter">${coments}</span>
      </button>
      <button class="post-button save">
        <svg width="19" height="19" class="icon icon-save">
          <use xlink:href="img/icons.svg#save"></use>
        </svg>
      </button>
      <button class="post-button share">
        <svg width="17" height="19" class="icon icon-share">
          <use xlink:href="img/icons.svg#share"></use>
        </svg>
      </button>
    </div>
    <div class="post-author">
      <div class="author-about">
        <a href="#" class="author-username">${author.displayName}</a>
        <span class="post-time">${date}</span>
      </div>
      <a href="#" class="author-link"><img src="${author.photo || DEFAULT_POPTO}" alt="avatar" class="author-avatar"></a>
    </div>
  </div>
</section>
  `
    })


    postWrapper.innerHTML = postsHTML
  }
  addPostElem.addEventListener('submit', (e) => {
    e.preventDefault()
    const {
      title,
      text,
      tegs
    } = addPostElem.elements
    if (title.value.length < 1) {
      alert('Title Короткий')
      return
    }
    if (text.value.length < 1) {
      alert('text Короткий')
      return
    }
    setPost.addPost(title.value, text.value, tegs.value, showPostAll)
    addPostElem.reset();
  })
  setPost.getPosts(showPostAll)
  // showPostAll()