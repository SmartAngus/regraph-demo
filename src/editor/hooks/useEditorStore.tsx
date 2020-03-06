import * as React from "react";
import * as _ from "lodash";
import { Node, Link } from "../defines";
import { ZoomTransform, zoomIdentity } from "d3-zoom";
import { mockData } from "../mock";

const { useState, useEffect } = React;

export function useEditorStore() {
  const [editorData, setEditorData] = useState();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [selectedLinks, setSelectedLinks] = useState<string[]>([]);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [dragNode, setDragNode] = useState(null);

  const [currTrans, setCurrTrans] = useState<ZoomTransform>(zoomIdentity);

  const [copiedNodes, setCopiedNodes] = useState<Node[]>([]);

  useEffect(() => {
    setEditorData(mockData);

    const newNodes = _.get(mockData, "steps").map(item => {
      return {
        ...item,
        ref: React.createRef()
      };
    });
    setNodes(newNodes);
    setLinks(_.get(mockData, "hops"));
  }, []);

  const updateNodes = (node: Node) => {
    const index = _.findIndex(nodes, item => item.id === node.id);

    setNodes([...nodes.slice(0, index), node, ...nodes.slice(index + 1)]);
  };

  const updateLinks = (link: Link) => {
    const index = _.findIndex(links, item => item.id === link.id);

    setLinks([...links.slice(0, index), link, ...links.slice(index + 1)]);
  };

  return {
    editorData,
    setEditorData,
    nodes,
    setNodes,
    links,
    setLinks,
    updateNodes,
    updateLinks,
    selectedLinks,
    setSelectedLinks,
    selectedNodes,
    setSelectedNodes,
    dragNode,
    setDragNode,
    copiedNodes,
    setCopiedNodes,
    currTrans,
    setCurrTrans
  };
}
