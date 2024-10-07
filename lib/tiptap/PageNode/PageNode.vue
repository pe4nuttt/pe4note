<template>
  <NodeViewWrapper>
    <div>
      <!-- <a :href="pageHref"> -->
      <div
        contenteditable="false"
        :style="{ padding: '3px 0 3px 2px' }"
        class="hover:bg-muted rounded-sm"
      >
        <EmojiPicker
          ref="emojiPickerRef"
          :model-value="pageIcon"
          @update:model-value="updatePageIcon"
        >
          <template v-slot="slotProps">
            <span class="text-base">{{ slotProps.value }}</span>
          </template>
        </EmojiPicker>
        <span class="underline font-semibold">
          {{ pageTitle }}
        </span>
      </div>
    </div>
  </NodeViewWrapper>
  <!-- <node-view-wrapper class="vue-component">
    <label contenteditable="false">Vue Component</label>
    <node-view-content class="content is-editable" />
  </node-view-wrapper> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { EDITOR_CONTENT } from '~/lib/constants';
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3';

// Component
import EmojiPicker from '@/components/global/EmojiPicker/index.vue';

export default defineComponent({
  props: nodeViewProps,
  components: {
    NodeViewWrapper,
    NodeViewContent,
    EmojiPicker,
  },
  setup(props) {
    const pageIcon = props.node.attrs.icon || EDITOR_CONTENT.DEFAULT_PAGE_ICON;
    const pageTitle = props.node.attrs.title || 'Untitled';
    const pageHref = props.node.attrs.href;

    // Methods
    const updatePageIcon = (val: string) => {
      props.updateAttributes({
        icon: val,
      });
    };

    return {
      pageIcon,
      pageTitle,
      pageHref,
      updatePageIcon,
    };
  },
});
</script>

<style scoped></style>
