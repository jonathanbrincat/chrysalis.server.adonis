console.log('JavaScript ready...');

/*const App = {
  template: `<div class="row">Vue <div class="offset-4 col-8"><article class="ui__card" v-for="(post, index) in posts" :key="post.id"><div class="card__body"><h2 class="post__title">{{ post.title }}</h2><p class="post__body">{{ post.body }}</p></div></article></div></div>`,

  async created() {

    try {
      const response = await fetch('http://127.0.0.1:3333/posts', {
        headers: {
          'Accept': 'application/json'
        }
      });
      // console.log('response =', response);
      const { posts, tags, favourites } = await response.json();
      // console.log('data = ', posts);

      this.posts = posts.data;

    }catch(error) {
      console.log('Something went wrong ', error);
    }

  },

  data() {
    return {
      posts: 'Hello Vue!!'
    }
  }
}

Vue.createApp(App).mount('#app')*/

const Quill = require('quill');
// const { ClassicEditor } = require('@ckeditor/ckeditor5-build-classic');

const $quill = [].slice.call(document.querySelectorAll('.quill'));

$quill.forEach(($editor) => {
  let quill  = new Quill($editor, {theme: 'snow'});
  quill.on('text-change', (delta) => update(delta, quill) );
})

function update(delta, quill) {
  console.log('foobar ', quill);
  var contents = quill.getContents();
  console.log('contents', contents);
  /*var html = "contents = " + JSON.stringify(contents, null, 2);
  if (delta) {
    console.log('change', delta)
    html = "change = " + JSON.stringify(delta, null, 2) + "\n\n" + html;
  }
  container.innerHTML = html;
  hljs.highlightBlock(container);*/
}

const $ckeditor = [].slice.call(document.querySelectorAll('.ckeditor'));

$ckeditor.forEach(($editor) => {
  ClassicEditor.create($editor)
    .then( (editor) => {
      console.log(editor);
    })
    .catch( (error) => {
      console.error(error);
    });
  })
