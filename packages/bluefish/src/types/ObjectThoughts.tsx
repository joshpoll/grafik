{
  /* <Key field={'plotMarkReified'}>
<LayoutID id={'plotMarkReified'}>
<LayoutGroup groupName={'plotMarkReified'}>
<LayoutGroup layoutName={'plotMarkReified'}>
<LayoutGroup layoutKey={'plotMarkReified'}> */
}

/*
use these ones:

<Group layoutKey={'plotMarkReified'}>
<Bluefish.Fragment layoutKey={'plotMarkReified'}>

Change processChildren so if it comes across a layout key it puts the child in an object using that
key.


<Child1 />
<Child2 />
<Child3 />

<Fragment layoutKey={'plotMarkReified'}>
  <Child1 />
  <Child2 />
  <Child3 />
</Fragment>

<Child1 />
<Fragment layoutKey={'plotMarkReified'}>
  <Child2 />
</Fragment>
<Child3 />


*/

export {};
