<?php

it('redirige la ruta principal al dashboard', function () {
    $response = $this->get('/');

    $response->assertRedirect('/dashboard');
});
