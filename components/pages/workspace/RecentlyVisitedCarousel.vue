<template>
  <Carousel :opts="{ dragFree: true }" :plugins="[WheelGesturesPlugin()]">
    <CarouselContent>
      <CarouselItem
        v-for="item in Array(10)"
        class="!w-36 pl-0 ml-4 max-w-36 h-36"
      >
        <a
          class="flex flex-col w-full h-full border rounded-xl cursor-pointer overflow-hidden bg-background"
        >
          <div class="h-11 w-full mb-4 relative">
            <div class="h-full w-full bg-popover"></div>
            <div class="absolute left-4 bottom-[-16px] text-xl">😀</div>
          </div>
          <div class="flex-1 flex flex-col justify-between px-4 pb-3 pt-[10px]">
            <div class="line-clamp-2 leading-[1.025rem] w-full text-sm">
              In this example the <code>-webkit-line-clamp</code> property is
              set to <code>3</code>, which means the text is clamped after three
              lines. An ellipsis will be shown at the point where the text is
              clamped.
            </div>
            <div class="flex">
              <Avatar class="w-4 h-4">
                <!-- <AvatarImage
                  src="https://github.com/radix-vue.png"
                  alt="@radix-vue"
                />
                <AvatarFallback>CN</AvatarFallback> -->
                A
              </Avatar>
            </div>
          </div>
        </a>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>

<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
</script>

<style scoped></style>
