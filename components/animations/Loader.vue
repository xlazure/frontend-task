<template>
    <div class="loader-container">
      <div v-for="i in dots" :key="i" class="dot"></div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dots: 5,
      };
    },
  };
  </script>
  
  <style scoped>
  body {
    background-color: #171c28;
  }
  
  .loader-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  
    .dot {
      width: 20px;
      height: 20px;
      background-color: #ffce06;
      border-radius: 50%;
      margin: 0 5px;
      animation: bounce 1.1s ease infinite;
  
      &:nth-child(1) {
        animation-delay: 0s;
      }
      &:nth-child(2) {
        animation-delay: 0.10s;
      }
      &:nth-child(3) {
        animation-delay: 0.20s;
      }
      &:nth-child(4) {
        animation-delay: 0.30s;
      }
      &:nth-child(5) {
        animation-delay: 0.40s;
      }
    }
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-60px);
    }
    60% {
      transform: translateY(25px);
    }
  }
  </style>
  