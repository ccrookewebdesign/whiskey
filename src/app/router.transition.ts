import {
  animate,
  state,
  group,
  query,
  style,
  transition,
  trigger,
  stagger,
  sequence
} from '@angular/animations';

export const ANM_ROUTE_ENTER = 'route-enter-staggered';

export const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [
    query(':enter > *', style({ opacity: 0, position: 'fixed' }), {
      optional: true
    }),
    query(':enter .' + ANM_ROUTE_ENTER, style({ opacity: 0 }), {
      optional: true
    }),
    sequence([
      query(
        ':leave > *',
        [
          style({ transform: 'translateY(0%)', opacity: 1 }),
          animate(
            '0.3s ease-in-out',
            style({ transform: 'translateY(-3%)', opacity: 0 })
          ),
          style({ position: 'fixed' })
        ],
        { optional: true }
      ),
      query(
        ':enter > *',
        [
          style({
            transform: 'translateY(-3%)',
            opacity: 0,
            position: 'static'
          }),
          animate(
            '0.3s ease-in-out',
            style({ transform: 'translateY(0%)', opacity: 1 })
          )
        ],
        { optional: true }
      )
    ]),
    query(
      ':enter .' + ANM_ROUTE_ENTER,
      stagger(40, [
        style({ transform: 'translateY(15%)', opacity: 0 }),
        animate(
          '0.3s ease-in-out',
          style({ transform: 'translateY(0%)', opacity: 1 })
        )
      ]),
      { optional: true }
    )
  ])
]);

export const slideInOutAnimation = [
  trigger('slideInOut', [
    state(
      'in',
      style({
        'max-height': '500px',
        opacity: '1',
        visibility: 'visible'
      })
    ),
    state(
      'out',
      style({
        'max-height': '0px',
        opacity: '0',
        visibility: 'hidden'
      })
    ),
    transition('in => out', [
      group([
        animate(
          '400ms ease-in-out',
          style({
            opacity: '0'
          })
        ),
        animate(
          '600ms ease-in-out',
          style({
            'max-height': '0px'
          })
        ),
        animate(
          '700ms ease-in-out',
          style({
            visibility: 'hidden'
          })
        )
      ])
    ]),
    transition('out => in', [
      group([
        animate(
          '1ms ease-in-out',
          style({
            visibility: 'visible'
          })
        ),
        animate(
          '600ms ease-in-out',
          style({
            'max-height': '500px'
          })
        ),
        animate(
          '800ms ease-in-out',
          style({
            opacity: '1'
          })
        )
      ])
    ])
  ])
];
