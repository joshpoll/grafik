import { withBluefish, useBluefishLayout, PropsWithBluefish } from '../../bluefish';
import { NewBBox } from '../../NewBBox';

export type AtomProps = PropsWithBluefish<
  React.SVGProps<SVGCircleElement> & {
    content: string;
  }
>;

export const Atom = withBluefish((props: AtomProps) => {
  console.log(props);
  const { name, content, ...rest } = props;
  console.log(name);
  console.log(rest);
  const { id, domRef, bbox } = useBluefishLayout({}, props, () => {
    const { cx, cy, r } = props;
    return {
      left: cx !== undefined ? +cx - +(r ?? 0) : undefined,
      top: cy !== undefined ? +cy - +(r ?? 0) : undefined,
      width: r !== undefined ? +r * 2 : undefined,
      height: r !== undefined ? +r * 2 : undefined,
    };
  });

  return (
    <g
      id={id}
      ref={domRef}
      transform={`translate(${bbox.coord?.translate?.x ?? 0} ${bbox.coord?.translate?.y ?? 0})
scale(${bbox.coord?.scale?.x ?? 1} ${bbox.coord?.scale?.y ?? 1})`}
    >
      <circle
        {...rest}
        cx={(bbox.left ?? 0) + (bbox.width ?? 0) / 2}
        cy={(bbox.top ?? 0) + (bbox.height ?? 0) / 2}
        r={(bbox.width ?? 0) / 2}
        aria-label={content}
      />
    </g>
  );
});
Atom.displayName = 'Atom';