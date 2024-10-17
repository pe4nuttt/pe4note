<template>
  <Carousel>
    <CarouselContent>
      <CarouselItem class="max-w-36 h-36">
        <a class="flex w-full h-full border rounded-md overflow-hidden">
          <div class="h-11 w-full">
            <div class="h-full w-full bg-"></div>
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
</script>

<style scoped></style>
