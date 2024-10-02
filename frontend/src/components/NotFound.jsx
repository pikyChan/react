import React from 'react'

function NotFound() {
  return (
<div class="flex items-center justify-center min-h-screen">
    <div class="text-center text-slate-800">
        <h1 class="text-6xl font-medium mt-2 mb-5">404</h1>
        <h2 class="text-2xl font-medium leading-snug mb-3 mt-0">Oops! It seems you are lost</h2>
        <p class="mb-4 text-slate-600">The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <a href='/' class="text-teal-600 font-semibold">Return to homepage</a>
    </div>
</div>

  )
}

export default NotFound
