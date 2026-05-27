$(document).ready(function () {

  // ==============================
  // ESTADO
  // ==============================
  let listaVisible = true;
  let contadorNum = 0;

  // ==============================
  // ACTUALIZAR CONTADOR
  // ==============================
  function actualizarContador() {
    const total = $('#lista-tareas .tarea-item').length;
    const completadas = $('#lista-tareas .tarea-item.completada').length;
    const pendientes = total - completadas;

    $('#total-tareas').text(total);
    $('#tareas-pendientes').text(pendientes);
    $('#tareas-completadas').text(completadas);

    if (total === 0) {
      $('#estado-vacio').fadeIn(300);
    } else {
      $('#estado-vacio').fadeOut(200);
    }
  }

  // ==============================
  // ACTUALIZAR NÚMEROS DE ÍTEMS
  // ==============================
  function actualizarNumeracion() {
    $('#lista-tareas .tarea-item').each(function (i) {
      $(this).find('.tarea-num').text(String(i + 1).padStart(2, '0'));
    });
  }

  // ==============================
  // AGREGAR TAREA
  // ==============================
  function agregarTarea() {
    const texto = $('#nueva-tarea').val().trim();

    if (texto === '') {
      $('#mensaje-error').fadeIn(200);
      setTimeout(function () { $('#mensaje-error').fadeOut(300); }, 2500);
      return;
    }

    $('#mensaje-error').fadeOut(200);
    contadorNum++;

    const num = String($('#lista-tareas .tarea-item').length + 1).padStart(2, '0');

    const $item = $('<li></li>').addClass('tarea-item tarea-nueva');
    const $num  = $('<span></span>').addClass('tarea-num').text(num);
    const $txt  = $('<span></span>').addClass('tarea-texto').text(texto);
    const $est  = $('<span></span>').addClass('tarea-estado')
                    .html('<i class="fa-solid fa-check"></i>');
    const $del  = $('<button></button>').addClass('btn-eliminar')
                    .attr('title', 'Eliminar')
                    .html('<i class="fa-solid fa-xmark"></i>');

    $item.append($num).append($txt).append($est).append($del);
    $item.hide();
    $('#lista-tareas').append($item);
    $item.fadeIn(350);

    $('#nueva-tarea').val('').focus();
    actualizarContador();
  }

  // ==============================
  // EVENTOS
  // ==============================
  $('#btn-agregar').click(function () {
    agregarTarea();
  });

  $('#nueva-tarea').keypress(function (e) {
    if (e.which === 13) agregarTarea();
  });

  // Completar tarea
  $('#lista-tareas').on('click', '.tarea-item', function (e) {
    if ($(e.target).closest('.btn-eliminar').length) return;
    $(this).toggleClass('completada');
    actualizarContador();
  });

  // Eliminar tarea
  $('#lista-tareas').on('click', '.btn-eliminar', function (e) {
    e.stopPropagation();
    const $item = $(this).closest('.tarea-item');
    $item.css({ transition: 'opacity 0.25s, transform 0.25s', opacity: 0, transform: 'translateX(20px)' });
    setTimeout(function () {
      $item.remove();
      actualizarNumeracion();
      actualizarContador();
    }, 260);
  });

  // Ocultar / mostrar lista
  $('#btn-toggle').click(function () {
    if (listaVisible) {
      $('#lista-tareas').fadeOut(350);
      $(this).find('i').removeClass('fa-eye').addClass('fa-eye-slash');
      listaVisible = false;
    } else {
      $('#lista-tareas').fadeIn(350);
      $(this).find('i').removeClass('fa-eye-slash').addClass('fa-eye');
      listaVisible = true;
    }
  });

  // Cambio de tema
  $('#btn-tema').click(function () {
    $('body').toggleClass('dark');
  });

  // ==============================
  // INIT
  // ==============================
  actualizarContador();
  $('#nueva-tarea').focus();

});
