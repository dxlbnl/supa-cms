<script lang='ts'>
  import { BubbleMenuPlugin, BubbleMenuPluginProps } from '@tiptap/extension-bubble-menu'

  // import { useCurrentEditor } from './Context.js'


    let element: HTMLDivElement;
    


export const BubbleMenu = (props: BubbleMenuProps) => {
  const [element, setElement] = useState<HTMLDivElement | null>(null)
  const { editor: currentEditor } = useCurrentEditor()

  useEffect(() => {
    if (!element) {
      return
    }

    if (props.editor?.isDestroyed || currentEditor?.isDestroyed) {
      return
    }

    const {
      pluginKey = 'bubbleMenu', editor, tippyOptions = {}, updateDelay, shouldShow = null,
    } = props

    const menuEditor = editor || currentEditor

    if (!menuEditor) {
      console.warn('BubbleMenu component is not rendered inside of an editor component or does not have editor prop.')
      return
    }

    const plugin = BubbleMenuPlugin({
      updateDelay,
      editor: menuEditor,
      element,
      pluginKey,
      shouldShow,
      tippyOptions,
    })

    menuEditor.registerPlugin(plugin)
    return () => menuEditor.unregisterPlugin(pluginKey)
  }, [props.editor, currentEditor, element])

}

<div bind:this={element}>
  <slot />
</div>

<style>
  div {
    visibility: hidden;
  }
</style>