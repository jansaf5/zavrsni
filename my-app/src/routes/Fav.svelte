<script>
    export let coin;
</script>

<div style="cursor: pointer;">
<p>{coin}</p>
</div>

<style>
    div{
        display: flex;
        flex-direction: column;
        height: 20px;
        max-width: 160px;
        justify-content: center;
        align-items: center;
        

        background-color: #f1f1f1;
        padding: 30px;
        margin: 10px;  
        border: 1px solid #333;
        transition: 0.15s;
    }

    div:hover{
        transform: scale(1.02);
        background-color: #f1f1f194;

    }
    p{
        text-transform: capitalize;
        font-family: sans-serif;
    }
</style>