console.log('JavaScript ready...');

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
