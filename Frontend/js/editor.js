const data = {
    dataCode : {},
    dataCodeString : '{}',
    html : ''
}

let editorInstance;

function mostrarEditor(){

    //Si existe una instancia del editor previamente, la destruimos primero
    if(editorInstance){
        editorInstance.destroy();
    }
    document.getElementById("edit-view").style.display = "flex";
    

    //Inicializamos una instancia del editor
    editorInstance = new EditorJS({
        /**
         * Enable/Disable the read only mode
         */
        readOnly: false,
    
        /**
         * Wrapper of Editor ====> editorjs es el div donde se va a mostrar el editor
         */
        holder: 'editorjs',
    
        /**
         * Common Inline Toolbar settings
         * - if true (or not specified), the order from 'tool' property will be used
         * - if an array of tool names, this order will be used
         */
        // inlineToolbar: ['link', 'marker', 'bold', 'italic'],
        // inlineToolbar: true,
    
        /**
         * Tools list
         */
        tools: {
          /**
           * Each Tool is a Plugin. Pass them via 'class' option with necessary settings {@link docs/tools.md}
           */
          header: {
            class: Header,
            inlineToolbar: ['marker', 'link'],
            config: {
              placeholder: 'Header'
            },
            shortcut: 'CMD+SHIFT+H'
          },
    
    
          list: {
            class: List,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+L'
          },
    
          quote: {
            class: Quote,
            inlineToolbar: true,
            config: {
              quotePlaceholder: 'Enter a quote',
              captionPlaceholder: 'Quote\'s author',
            },
            shortcut: 'CMD+SHIFT+O'
          },
    
    
          marker: {
            class:  Marker,
            shortcut: 'CMD+SHIFT+M'
          },
    
          code: {
            class:  CodeTool,
            shortcut: 'CMD+SHIFT+C'
          },
    
          delimiter: Delimiter,
    
          inlineCode: {
            class: InlineCode,
            shortcut: 'CMD+SHIFT+C'
          },
    
          linkTool: LinkTool,
    
          embed: Embed,
    
          table: {
            class: Table,
            inlineToolbar: true,
            shortcut: 'CMD+ALT+T'
          },
    
        },
    
        /**
         * This Tool will be used as default
         */
        // defaultBlock: 'paragraph',
    
        /**
         * Initial Editor data
         */
        data: isValidJSON(texto) ? JSON.parse(texto) : {}
    });

    
}

function isValidJSON(text) {
  try {
      JSON.parse(text);
      return true;
  } catch (e) {
      return false;
  }
}

function guardar() { 
    return editorInstance.save().then((outputData) => {
        const edjsParser = edjsHTML();
        let htmlData = edjsParser.parse(outputData);
        console.log(outputData);
        let html = '';

        for (const code of htmlData) {
            html += code;
        }

        data.dataCode = outputData;
        data.html = html; 
        console.log(data.html);
        data.dataCodeString = JSON.stringify(outputData); 
        return data.dataCodeString;
    }).catch((error) => {
        console.log('Saving failed: ', error);
        throw error; 
    });
}