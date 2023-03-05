const ingredients = Array.from(document.querySelectorAll('.ingredient'))
        .map(input => input.value.trim())
        .join(',');